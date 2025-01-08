from fastapi import FastAPI, HTTPException
import joblib
import os
from fastapi.middleware.cors import CORSMiddleware
from .yt_scraper import get_data
import boto3
from datetime import datetime ,timezone
import asyncio
from concurrent.futures import ThreadPoolExecutor
import time
import uuid
from dotenv import load_dotenv
from .main_prepro import tokenize_arab_text
from contextlib import asynccontextmanager
import warnings
from sklearn.exceptions import InconsistentVersionWarning
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    models_dir = os.path.join(os.path.dirname(__file__), "Models")
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, 'sentiment_model.joblib')
    vectorizer_path = os.path.join(models_dir, 'vectorizer.joblib')
    
    models_exist = all(os.path.exists(path) for path in [model_path, vectorizer_path])
    
    if not models_exist:
        print("Models not found locally. Downloading from S3...")
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_DEFAULT_REGION')
        )
        
        bucket_name = os.getenv('AWS_BUCKET_NAME')
        
        files_to_download = [
            ('models/sentiment_model.joblib', model_path),
            ('models/vectorizer.joblib', vectorizer_path),
        ]
        
        for s3_path, local_path in files_to_download:
            try:
                s3_client.download_file(bucket_name, s3_path, local_path)
                print(f"Successfully downloaded {s3_path}")
            except Exception as e:
                print(f"Error downloading {s3_path}: {str(e)}")
                raise RuntimeError(f"Failed to download required model: {str(e)}")
    else:
        print("Models already exist locally")
    
    try:
        global model, vectorizer
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        
        print("Models loaded successfully")
        yield
    except Exception as e:
        print(f"Critical error loading models: {str(e)}")
        raise RuntimeError(f"Failed to load models: {str(e)}")
    finally:
        print("Shutting down")

app = FastAPI(
        lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_DEFAULT_REGION')
)
table = dynamodb.Table(os.getenv('DYNAMODB_TABLE_NAME'))

executor = ThreadPoolExecutor(max_workers=1)
last_save_time = 0

model = None
vectorizer = None

def load_models():
    global model, vectorizer
    
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, 'models', 'sentiment_model.joblib')
        vectorizer_path = os.path.join(current_dir, 'models', 'vectorizer.joblib')
        
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        print("Models loaded successfully from local files")
        return True
    except Exception as e:
        print(f"Error loading models: {str(e)}")
        return False


def truncate_text(text: str, max_bytes: int = 1024) -> str:
    encoded = text.encode('utf-8')
    if len(encoded) <= max_bytes:
        return text
    return encoded[:max_bytes].decode('utf-8', errors='ignore')

def save_to_dynamodb(prediction_data):
    global last_save_time

    try:
        current_time = time.time()
        time_since_last_save = current_time - last_save_time
        if time_since_last_save < 1:
            time.sleep(1 - time_since_last_save)

        truncated_text = truncate_text(prediction_data['text'])
        # print(truncated_text)
        item_id = str(uuid.uuid4())  
        if prediction_data['probability'] is not None:

            item = {
                'id': item_id, 
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'usr_text': truncated_text,
                'sentiment': prediction_data['sentiment'],
                'probability': str(prediction_data['probability'])
            }
        else:
            item = {
                'id': item_id, 
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'usr_text': truncated_text,
                'sentiment': prediction_data['sentiment'],
                'feedback': prediction_data['feedback']
            }
        # print(item)
        print("Saving item to DynamoDB...")
        table.put_item(Item=item)
        print("Item saved successfully")
        last_save_time = time.time()
    except Exception as e:
        print(f"Error saving to DynamoDB: {str(e)}")


async def async_save_to_dynamodb(prediction_data):
    loop = asyncio.get_event_loop()
    print(prediction_data)
    # print("is added")
    await loop.run_in_executor(executor, save_to_dynamodb, prediction_data)

@app.get("/predict/{text}")
async def predict_sentiment(text: str):
    try:
        # truncated_text = truncate_text(tokenize_arab_text(text))
        
        text_vectorized = vectorizer.transform([tokenize_arab_text(text)])
        prediction = model.predict(text_vectorized)[0]
        probabilities = model.predict_proba(text_vectorized)[0]
        probability_percentage = int(round(probabilities[1 if prediction == 1 else 0] * 100))
        # print("ggggg")
        # print(text_vectorized)
        result = {
            "text": text,
            "sentiment": "Positive" if prediction == 1 else "Negative",
            "probability": probability_percentage,
        }
        
        asyncio.create_task(async_save_to_dynamodb(result))
        
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )

@app.get("/analyze-youtube/")
async def analyze_youtube_comments(video_url: str):
    max_results = 6
    try:
        comments_df, thumbnail_url = get_data(video_url, max_results)
        
        analyzed_comments = []
        total_probability = 0
        positive_count = 0
        
        for comment in comments_df["Comment"]:
            text_vectorized = vectorizer.transform([tokenize_arab_text(comment)])
            prediction = model.predict(text_vectorized)[0]
            probabilities = model.predict_proba(text_vectorized)[0]
            probability_percentage = int(round(probabilities[1 if prediction == 1 else 0] * 100))
            
            if prediction == 1:
                positive_count += 1
            total_probability += probability_percentage
            
            analyzed_comments.append({
                "text": comment,
                "sentiment": "positive" if prediction == 1 else "negative",
                "probability": probability_percentage
            })
        
        avg_probability = int(round(total_probability / len(analyzed_comments)))
        overall_sentiment = "positive" if positive_count >= len(analyzed_comments)/2 else "negative"
        
        return {
            "url": video_url,
            "thumbnail": thumbnail_url,
            "overall_sentiment": overall_sentiment,
            "average_certainty": avg_probability,
            "comments_analysis": analyzed_comments
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing YouTube URL: {str(e)}"
        )

@app.post("/save-feedback/")
async def save_user_feedback(text:str,sentiment: str ,feedback: str):
# /print("test")
    # print(text,sentiment, feedback)
    asyncio.create_task(async_save_to_dynamodb({
        "text": text,
        "sentiment": sentiment,
        "feedback": feedback , 
        'probability': None
    }))


@app.get("/")
async def root():
    return {"message": "fin a Batal (2.0)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

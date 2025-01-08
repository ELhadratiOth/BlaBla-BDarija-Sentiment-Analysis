import boto3
import os
from dotenv import load_dotenv

load_dotenv()

def upload_to_s3(local_file_path, s3_key):
    try:
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_DEFAULT_REGION')
        )
        
        bucket_name = os.getenv('AWS_BUCKET_NAME')
        s3_client.upload_file(local_file_path, bucket_name, s3_key)
        print(f"Successfully uploaded {local_file_path} to s3://{bucket_name}/{s3_key}")
        return True
    except Exception as e:
        print(f"Error uploading {local_file_path}: {str(e)}")
        return False

    

if __name__ == "__main__":
    upload_to_s3('./sentiment_model.joblib', './sentiment_model.joblib')
    upload_to_s3('./vectorizer.joblib', './vectorizer.joblib')
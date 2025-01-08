import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.utils import resample
import joblib
import os
import json
import glob
from upload_model import upload_to_s3
import warnings
warnings.filterwarnings("ignore", message=".*Upper case characters found in vocabulary.*")


SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

def load_and_balance_data():
    dataset_dir = os.path.join(SCRIPT_DIR, "DataSet")
    all_files = glob.glob(os.path.join(dataset_dir, "*.csv"))
    
    dfs = []
    for file in all_files:
        df = pd.read_csv(file)
        dfs.append(df)
    
    df = pd.concat(dfs, ignore_index=True)
    
    df_majority = df[df['target'] == 0]
    df_minority = df[df['target'] == 1]
    
    n_samples = min(len(df_majority), len(df_minority))
    
    df_majority_downsampled = resample(df_majority, 
                                     replace=False,
                                     n_samples=n_samples,
                                     random_state=42)
    
    df_balanced = pd.concat([df_minority, df_majority_downsampled])
    
    print(f"Total samples after balancing: {len(df_balanced)}")
    print(f"Class distribution:\n{df_balanced['target'].value_counts()}")
    
    return df_balanced

def train_model():
    df = load_and_balance_data()
    
    X = df['text_cleaned'].astype(str)
    y = df['target'].astype(int)
    
    tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    X_tfidf = tfidf_vectorizer.fit_transform(X)
    
    words = tfidf_vectorizer.get_feature_names_out()
    print("Total tokens:", len(words))
    
    tfidf_scores = np.asarray(X_tfidf.sum(axis=0)).flatten()
    sorted_indices = np.argsort(tfidf_scores)[::-1]
    cumulative_tfidf = np.cumsum(tfidf_scores[sorted_indices])
    total_tfidf = cumulative_tfidf[-1]
    threshold = 0.9 * total_tfidf
    
    cutoff_index = np.where(cumulative_tfidf >= threshold)[0][0]
    selected_ngrams = words[sorted_indices][:cutoff_index + 1]
    selected_vocab = selected_ngrams.tolist()
    print("Reduced tokens:", len(selected_vocab))
    
    tfidf = TfidfVectorizer(vocabulary=selected_vocab, min_df=0.1)
    X_tfidf = tfidf.fit_transform(X)
    
    print(f"Total vocabulary size: {len(selected_vocab)}")
    print(f"Using top {len(selected_vocab)} features (90% of highest TF-IDF scores)")
    
    print("Training SVM model...")
    svm = SVC(probability=True, C=5, gamma=0.1, kernel='rbf', random_state=42)
    svm.fit(X_tfidf, y)
    print("Model training completed!")
    
    models_dir = os.path.join(SCRIPT_DIR, "Models")
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, "sentiment_model.joblib")
    vectorizer_path = os.path.join(models_dir, "vectorizer.joblib")
    info_path = os.path.join(models_dir, "model_info.json")
    
    print("Saving model files locally...")
    joblib.dump(svm, model_path)
    joblib.dump(tfidf, vectorizer_path)
    
    model_info = {
        "total_samples": len(X),
        "samples_per_class": int(len(X)/2),
        "model_path": "sentiment_model.joblib",
        "vectorizer_path": "vectorizer.joblib",
        "feature_count": X_tfidf.shape[1],
        "training_date": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    with open(info_path, 'w') as f:
        json.dump(model_info, f, indent=4)
    
    print(f"\nModel files saved locally in: {models_dir}")
    print("\nUploading model and vectorizer to S3...")
    upload_to_s3(model_path, 'models/sentiment_model.joblib')
    upload_to_s3(vectorizer_path, 'models/vectorizer.joblib')

if __name__ == "__main__":
    train_model()

import os
import json
import pandas as pd
from datetime import datetime
import boto3
from boto3.dynamodb.conditions import Key
from dotenv import load_dotenv
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv()
def save_to_csv():
    try:
        # Initialize DynamoDB client
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_DEFAULT_REGION')
        )
        
        table = dynamodb.Table(os.getenv('DYNAMODB_TABLE_NAME'))
        
        # Get the last run timestamp from JSON file
        last_run_file = os.path.join(SCRIPT_DIR, "DataSet", "last_run.json")
        if os.path.exists(last_run_file):
            with open(last_run_file, 'r') as f:
                last_run = json.load(f)
                last_timestamp = last_run.get('last_timestamp', '2000-01-01T00:00:00')
        else:
            last_timestamp = '2000-01-01T00:00:00'
        
        # Query items after the last timestamp
        response = table.scan()
        items = response['Items']
        
        if not items:
            print("No data found in the table")
            return
        
        # Convert to DataFrame
        df = pd.DataFrame(items)
        
        initial_rows = len(df)  
        
        df.drop(columns=['id' , 'probability'], inplace=True)
        df.dropna(subset=['feedback'], inplace=True)
        df = df[df['sentiment'].isin(['Positive', 'Negative'])]
        df = df.rename(columns={'usr_text': 'text_cleaned', 'sentiment': 'target'})
        incorrect_mask = df['feedback'] == 'incorrect'
        df.loc[incorrect_mask, 'target'] = df.loc[incorrect_mask, 'target'].map({'Positive': 'Negative', 'Negative': 'Positive'})
        df['target'] = df['target'].map({'Positive': '1', 'Negative': '0'})
        df.drop(columns=['feedback'], inplace=True)
        
        # Create DataSet directory if it doesn't exist
        dataset_dir = os.path.join(SCRIPT_DIR, "DataSet")
        os.makedirs(dataset_dir, exist_ok=True)
        
        # Save to CSV
        csv_path = os.path.join(dataset_dir, "dynamodb_data.csv")
        df.to_csv(csv_path, index=False)
        print(f"dynamo data saved")
        
        timestamp_data = {
            "script_execution_time": datetime.now().strftime("%d-%m-%Y at %H:%M:%S"),
            "last_updated_table_timestamp": datetime.fromisoformat(items[0].get('timestamp', '')).strftime("%d-%m-%Y at %H:%M:%S"),
            "initial_row_count": initial_rows,
            "final_row_count": len(df),
            "rows_removed": initial_rows - len(df)
        }
        
        json_path = os.path.join(dataset_dir, "last_run.json")
        with open(json_path, 'w') as f:
            json.dump(timestamp_data, f, indent=4)
        print(f"json successfuly saved")
        
    except Exception as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    save_to_csv()
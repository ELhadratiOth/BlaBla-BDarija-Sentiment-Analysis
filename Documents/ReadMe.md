# Darija Project Structure
### NB : the Datasets and the Notebooks can contain some bad words 
## Darija_App (React + FastAPI)
Contains all components required to run the application:
- Frontend implementation
- Backend server
- GitHub workflow scripts for backend server availability

## Data Preparation
### json-s/
Contains JSON files with:
- Stop words
- Scraped suffixes and prefixes required for model training

### Main_Notebook/
Contains primary Jupyter notebooks for:
- Data preprocessing
- YouTube API data labeling
- Best Model training and evaluation
- Deep learning models implementation
- Fine-tuning Darija pre-trained model
- Benchmarking with an existing model

### Notebooks/
Contains experimental Jupyter notebooks for model testing with various parameters

### scripts/
Contains utility scripts for:
- Data cleaning
- Web scraping (stop words, prefixes, suffixes)

## Data Collection
### DataScraping/
- Notebooks and scripts for YouTube API data collection
- Data saving utilities for labeling

### DataSets/
- Cleaned datasets
- Production dataset

### RawData/
- Raw training data
- Lexicons
- Stop words

## Documentation
### doc/
Contains project documentation and research paper

## Automation
### AutoWorkflow/
Implementation of active learning pipeline:
- DynamoDB integration for user data
- S3 storage for model persistence
- Model retraining automation
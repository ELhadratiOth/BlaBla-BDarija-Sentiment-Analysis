# Darija Project Structure
### NB : the Datasets and the Notebooks can contain some bad words 

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
Contains<div align="center">

# 🎯 Darija Sentiment Analysis Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

Sentiment analysis platform designed specifically for Darija (Moroccan Arabic)
</div>

## 📖 Overview

Analyze sentiment in Darija text through:
- ✍️ Direct text input
- 🎥 YouTube video comments
- 🔌 REST API integration

## 🏗 Architecture

<p align="center">
  <img src="./Documents/architecture.png" alt="System Architecture">
</p>

### 📥 Input Options
- **Text Analysis**: Direct Darija text input
- **YouTube Integration**: Comment sentiment analysis via URL
- **API Access**: Programmatic integration capabilities

### 🔧 Backend Services (FastAPI)
- Text & comment processing
- ML model interaction
- DynamoDB data management
- RESTful API endpoints

### 🎨 Web Interface (React.js)
- Clean, intuitive UI
- Real-time sentiment analysis
- User feedback system

### 💾 Data Storage (DynamoDB)
- User input archival
- Feedback collection
- Performance metrics

### 🧠 ML Model
<p align="center">
  <img src="./Documents/model_architecture.png" alt="Model Architecture">
</p>

## ⭐️ Core Features

### 📊 Sentiment Analysis
- Darija-optimized processing
- Text & comment analysis
- Binary classification (positive/negative)

### 🔌 API Integration
```bash
curl -X POST "api/analyze" \
     -H "Content-Type: application/json" \
     -d '{"text": "زوين بزاف"}' project documentation and research paper

## Automation
### AutoWorkflow/
Implementation of active learning pipeline:
- DynamoDB integration for user data
- S3 storage for model persistence
- Model retraining automation

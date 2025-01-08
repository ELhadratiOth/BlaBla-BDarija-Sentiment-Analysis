import os
from dotenv import load_dotenv
import googleapiclient.discovery
import pandas as pd

load_dotenv()

def get_data(video_link, max_results=6):
    API_KEY = os.environ['YTKEY']
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    VIDEO_ID = video_link.split("v=")[1].split("&")[0]

    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=API_KEY)

    video_request = youtube.videos().list(
        part="snippet",
        id=VIDEO_ID
    )
    video_response = video_request.execute()
    thumbnail_url = video_response["items"][0]["snippet"]["thumbnails"]["high"]["url"]

    comment_request = youtube.commentThreads().list(
        part="snippet",
        videoId=VIDEO_ID,
        maxResults=max_results,
        order="relevance"
    )
    comment_response = comment_request.execute()

    comments = []
    for item in comment_response["items"]:
        comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
        comments.append(comment)
        
    df = pd.DataFrame(comments, columns=["Comment"])
    return df, thumbnail_url

if __name__ == "__main__":
    VIDEO_URL = "https://www.youtube.com/watch?v=RewnyiwsVbw"
    top_comments, thumbnail = get_data(VIDEO_URL)
    print("tmb", thumbnail)
    print("coms")
    print(top_comments)

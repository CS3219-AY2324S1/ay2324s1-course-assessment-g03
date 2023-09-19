import time
from typing import Optional
from fastapi import FastAPI, HTTPException, Request
from pymongo import MongoClient
from fastapi.responses import RedirectResponse
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', '27017')

app = FastAPI()

def connect_to_mongo(db_url, retries=5, delay=5):
    print(f"Connecting to MongoDB at {db_url}...")
    client = MongoClient(db_url)
    for _ in range(retries):
        try:
            client.admin.command('ismaster')
            return client
        except ConnectionFailure:
            print(f"Failed to connect to MongoDB. Retrying in {delay} seconds...")
            time.sleep(delay)
    raise ConnectionError("Could not connect to MongoDB after multiple retries.")

# Establish a connection to the MongoDB server
client = connect_to_mongo(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/")
print("Successfully connected to MongoDB!")
db = client['leetcode_db']
collection = db['problems']


def jsend_response(status: str, data=None, message=None):
    """Returns a JSend-style response object as a FastAPI server response"""
    response = {"status": status}
    if data is not None:
        response["data"] = data
    if message is not None:
        response["message"] = message
    return response

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

@app.get("/questions")
async def get_questions(
    difficulty: Optional[str] = None,
    topic: Optional[str] = None,
    language: Optional[str] = None
):
    query_filter = {
        "paid_only": False
    }
    
    if difficulty:
        query_filter["difficulty"] = difficulty
    if topic:
        query_filter["topic_tags"] = topic
    if language:
        query_filter["languages"] = language

    cursor = collection.find(query_filter, {"_id": 0, "id": 1, "title": 1})
    questions = list(cursor)

    return jsend_response("success", {"questions": questions})

@app.get("/questions/all")
async def get_all_questions():
    questions = list(collection.find({}))
    for question in questions:
        question["_id"] = str(question["_id"])
    return jsend_response("success", {"questions": questions})

@app.get("/question/{question_id}")
async def get_one_question(question_id: str):
    question = collection.find_one({"id": question_id})
    if question:
        question["_id"] = str(question["_id"])
        return jsend_response("success", {"question": question})
    else:
        return jsend_response("fail", message="Question not found")


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    """Custom exception handler to return JSend-style responses for HTTPExceptions"""
    return jsend_response("error", message=exc.detail)

import time
from typing import Optional
from fastapi import FastAPI, HTTPException, Request
from pymongo import MongoClient
from fastapi.responses import RedirectResponse
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os
from enum import Enum

class JSendStatus(Enum):
    SUCCESS = "success"
    FAIL = "fail"
    ERROR = "error"

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


def jsend_response(status: JSendStatus, data=None, message=None):
    response = {"status": status.value}
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
    topic: Optional[str] = None
):
    """Returns a list of questions (ids and titles) matching the given criteria: Difficulty and Topic"""
    query_filter = {
        "paid_only": False
    }
    
    if difficulty:
        query_filter["difficulty"] = difficulty
    if topic:
        query_filter["topic_tags"] = topic

    # Only return the id and title fields
    cursor = collection.find(
        query_filter, {"_id": False, "id": True, "title": True})
    questions = list(cursor)

    if not questions:
        raise HTTPException(
            status_code=404, detail="No questions found with the given criteria.")

    return jsend_response(JSendStatus.SUCCESS, {"questions": questions})

@app.get("/questions/all")
async def get_all_questions():
    """Returns a list of all questions with all fields"""
    questions = list(collection.find({}))

    if not questions:
        raise HTTPException(
            status_code=404, detail="No questions found in the database.")

    for question in questions:
        question["_id"] = str(question["_id"])
    return jsend_response(JSendStatus.SUCCESS, {"questions": questions})

@app.get("/question/{question_id}")
async def get_one_question(question_id: str):
    """Returns a single question matching the given id"""
    question = collection.find_one({"id": question_id})

    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")

    question["_id"] = str(question["_id"])
    return jsend_response(JSendStatus.SUCCESS, {"question": question})


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    """Custom exception handler to return JSend-style responses for HTTPExceptions"""
    return jsend_response(JSendStatus.ERROR, code=exc.status_code, message=exc.detail)


from core.database import collection
from utils.jsend import JSendStatus, jsend_response
from typing import Annotated, Union
from fastapi import APIRouter, Query, HTTPException
import sys

sys.path.append("..")

router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)


@router.get("")
async def get_questions(
    difficulty: Annotated[Union[list[str], None], Query()] = None,
    topic: Annotated[Union[list[str], None], Query()] = None
):
    """Returns a list of questions (ids and titles) matching the given criteria: Difficulty and Topic"""
    query_filter = {
        "paid_only": False
    }

    if difficulty:
        query_filter["difficulty"] = {"$in": difficulty}
    if topic:
        query_filter["topic_tags"] = {"$in": topic}

    # Only return the id and title fields
    cursor = collection.find(
        query_filter, {"_id": False, "id": True, "title": True})
    questions = list(cursor)

    if not questions or len(questions) == 0:
        raise HTTPException(
            status_code=404, detail="No questions found with the given criteria.")

    return jsend_response(JSendStatus.SUCCESS, {"questions": questions})


@router.get("/all")
async def get_all_questions():
    """Returns a list of all questions with all fields"""
    questions = list(collection.find({}))

    if not questions or len(questions) == 0:
        raise HTTPException(
            status_code=404, detail="No questions found in the database.")

    for question in questions:
        question["_id"] = str(question["_id"])
    return jsend_response(JSendStatus.SUCCESS, {"questions": questions})


@router.get("/filters")
async def get_question_filters():
    """Returns a list of all possible filters for questions: Difficulty and Topic"""
    difficulties = collection.distinct("difficulty")
    filter_data = {}

    for difficulty in difficulties:
        topics = collection.distinct("topic_tags", {"difficulty": difficulty})
        filter_data[difficulty] = topics

    return jsend_response(JSendStatus.SUCCESS, filter_data)


@router.get("/{question_id}")
async def get_one_question(question_id: int):
    """Returns a single question matching the given id"""

    question = collection.find_one({"id": question_id})

    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")

    question["_id"] = str(question["_id"])
    return jsend_response(JSendStatus.SUCCESS, {"question": question})

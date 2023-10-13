from core.database import collection
from utils.jsend import JSendStatus, jsend_response
from fastapi import FastAPI, HTTPException, Request, Query, APIRouter
from fastapi.responses import JSONResponse
from typing import Optional, Annotated, List, Union
import sys

sys.path.append("..")


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.post("/questions")
async def create_question(question: dict):
    """Creates a new question in the database"""

    # Check if id is provided. If not, auto-increment from the last id
    if "id" not in question:
        last_question = collection.find_one(sort=[("id", -1)])
        if last_question:
            question["id"] = last_question["id"] + 1
        else:
            question["id"] = 1

    # Check if question with the same id already exists
    if collection.find_one({"id": question["id"]}):
        raise HTTPException(
            status_code=400, detail="Question with the same id already exists.")
    result = collection.insert_one(question)

    question["_id"] = str(question["_id"])

    return jsend_response(JSendStatus.SUCCESS, {"inserted_data": question})


@router.get("/questions")
async def get_questions(
    skip: int = Query(
        0, alias="page", description="Page number for pagination. Starts from 0."),
    limit: int = Query(
        10, description="Number of items to retrieve per page."),
    sort_by: Optional[str] = Query(
        "id", description="Field to sort by. E.g., 'title'."),
    order: Optional[str] = Query(
        "asc", description="Order of sorting. Use 'asc' for ascending and 'desc' for descending.")
):
    """
    Retrieve questions with optional sorting and pagination. Used for admin portal view.
    """
    # Basic validation for order
    if order not in ["asc", "desc"]:
        raise HTTPException(
            status_code=400, detail="Invalid order value. Use 'asc' or 'desc'.")

    # Create the sort order
    sort_order = 1 if order == "asc" else -1

    # If sort_by is provided, use it for sorting
    sort_data = [(sort_by, sort_order)] if sort_by else [("id", sort_order)]

    # Fetch data from MongoDB with sorting and pagination
    cursor = collection.find({}, {"_id": False}).sort(
        sort_data).skip(skip).limit(limit)
    questions = list(cursor)

    if not questions or len(questions) == 0:
        raise HTTPException(status_code=404, detail="No questions found.")

    return jsend_response(JSendStatus.SUCCESS, {"questions": questions})


@router.put("/questions/{question_id}")
async def update_question(question_id: str, updated_data: dict):
    """Updates an existing question in the database"""
    result = collection.update_one({"id": question_id}, {"$set": updated_data})

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Question not found.")

    return jsend_response(JSendStatus.SUCCESS, {"updated_id": question_id, "updated_data": updated_data})


@router.delete("/questions/{question_id}")
async def delete_question(question_id: str):
    """Deletes a question from the database"""
    result = collection.delete_one({"id": question_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Question not found.")

    return jsend_response(JSendStatus.SUCCESS, {"deleted_id": question_id})

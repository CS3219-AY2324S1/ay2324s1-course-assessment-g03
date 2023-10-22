import math
from typing import Annotated, Optional, Union
from fastapi import APIRouter, Query, HTTPException
import sys

sys.path.append("..")
from core.database import collection
from utils.jsend import JSendStatus, jsend_response

questions_router = APIRouter(
    prefix="/api/questions", 
    tags=["Questions"],
)


@questions_router.get("")
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

@questions_router.get("/view")
async def get_questions(
    page: int = Query(1, description="Page number for pagination. Starts from 1."),
    limit: int = Query(10, description="Number of items to retrieve per page."),
    sort_by: Optional[str] = Query("id", description="Field to sort by. E.g., 'title'."),
    order: Optional[str] = Query("asc", description="Order of sorting. Use 'asc' for ascending and 'desc' for descending."),
    difficulty: Annotated[Union[list[str], None], Query(description="Filter by difficulty")] = None,
    topic: Annotated[Union[list[str], None], Query(description="Filter by topic")] = None,
    category: Annotated[Union[list[str], None], Query(description="Filter by category")] = None,
    paid_only: Optional[bool] = Query(None, description="Filter by paid status. Use a boolean value. Eg. 'true', 'True', 1 for True and 'false', 'False', 0 for False."),
    search: Optional[str] = Query(None, description="Search string for questions.")
):
    """
    Retrieve questions with optional sorting, pagination, search query and filters. Used for question portal view.
    """
    # Basic validation for order
    if order not in ["asc", "desc"]:
        raise HTTPException(status_code=400, detail="Invalid order value. Use 'asc' or 'desc'.")

    # Create the sort order
    sort_order = 1 if order == "asc" else -1

    # If sort_by is provided, use it for sorting
    sort_data = [(sort_by, sort_order)] if sort_by else [("id", sort_order)]

    # Get skip count
    skip_count = (page - 1) * limit

    # Build the MongoDB query with filters
    query = {}
    if category:
        query["category"] = {"$in": category}
    if difficulty:
        query["difficulty"] = {"$in": difficulty}
    if topic:
        query["topic_tags"] = {"$in": topic}
    if paid_only is not None:
        query["paid_only"] = paid_only
    if search:
        query["$text"] = {"$search": search}

    # Fetch data from MongoDB with sorting, pagination, and filters
    cursor = collection.find(query, {"_id": False}).sort(sort_data).skip(skip_count).limit(limit)
    questions = list(cursor)

    if not questions or len(questions) == 0:
        raise HTTPException(status_code=404, detail="No questions found.")

    # Add pagination metadata
    total_questions = collection.count_documents(query)
    total_pages = math.ceil(total_questions / limit)
    pagination = {
        "current_page": page,
        "limit": limit,
        "sort_by": sort_by,
        "order": order,
        "total_questions": total_questions,
        "total_pages": total_pages,
    }

    # Add filters metadata
    filters = {}
    if category:
        filters["category"] = category
    if difficulty:
        filters["difficulty"] = difficulty
    if topic:
        filters["topic"] = topic
    if paid_only is not None:
        filters["paid_only"] = paid_only
    if search:
        filters["search"] = search

    return jsend_response(JSendStatus.SUCCESS, {"questions": questions, "pagination": pagination, "filters": filters})

@questions_router.get("/all")
async def get_all_questions():
    """Returns a list of all questions with all fields"""
    questions = list(collection.find({}))

    if not questions or len(questions) == 0:
        raise HTTPException(
            status_code=404, detail="No questions found in the database.")

    for question in questions:
        question["_id"] = str(question["_id"])
    return jsend_response(JSendStatus.SUCCESS, {"questions": questions})


@questions_router.get("/filters")
async def get_question_filters():
    """Returns a list of all possible filters for questions: Difficulty and Topic"""
    difficulties = collection.distinct("difficulty")
    filter_data = {}

    for difficulty in difficulties:
        topics = collection.distinct("topic_tags", {"difficulty": difficulty, "paid_only": False})
        filter_data[difficulty] = topics

    return jsend_response(JSendStatus.SUCCESS, filter_data)


@questions_router.get("/{question_id}")
async def get_one_question(question_id: int):
    """Returns a single question matching the given id"""

    question = collection.find_one({"id": question_id})

    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")

    question["_id"] = str(question["_id"])
    return jsend_response(JSendStatus.SUCCESS, {"question": question})

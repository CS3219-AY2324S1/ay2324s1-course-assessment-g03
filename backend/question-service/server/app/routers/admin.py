from fastapi import HTTPException, APIRouter
import sys

sys.path.append("..")
from core.database import collection
from utils.jsend import JSendStatus, jsend_response


admin_router = APIRouter(
    prefix="/api/admin", 
    tags=["Admin"],
)


@admin_router.post("/questions")
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

    # Check if question with the same title already exists
    if collection.find_one({"title": question["title"]}):
        raise HTTPException(
            status_code=400, detail="Question with the same title already exists.")
    
    result = collection.insert_one(question)

    question["_id"] = str(question["_id"])

    return jsend_response(JSendStatus.SUCCESS, {"question": question})

@admin_router.put("/questions/{question_id}")
async def update_question(question_id: int, updated_data: dict):
    """Updates an existing question in the database"""

    # Check if updated_data is empty
    if not updated_data:
        raise HTTPException(status_code=400, detail="Updated data not provided.")
    
    # Check if question with the same title already exists
    if collection.find_one({"title": updated_data["title"]}):
        raise HTTPException(
            status_code=400, detail="Question with the same title already exists.")

    result = collection.update_one({"id": question_id}, {"$set": updated_data})

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Question not found.")

    return jsend_response(JSendStatus.SUCCESS, {"updated_id": question_id, "updated_data": updated_data})


@admin_router.delete("/questions/{question_id}")
async def delete_question(question_id: int):
    """Deletes a question from the database"""
    result = collection.delete_one({"id": question_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Question not found.")

    return jsend_response(JSendStatus.SUCCESS, {"deleted_id": question_id})

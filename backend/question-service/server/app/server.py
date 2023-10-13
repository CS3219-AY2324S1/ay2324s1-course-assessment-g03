import time
from typing import Optional, Annotated, List, Union
from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from fastapi.responses import RedirectResponse
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os
from enum import Enum

from utils.exception_handler import custom_http_exception_handler
from routers.questions import router as questions_router
from routers.admin import router as admin_router


load_dotenv(".env.development")
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")

app = FastAPI()

# Add custom exception handler
app.add_exception_handler(HTTPException, custom_http_exception_handler)

# Add routers
app.include_router(questions_router)
app.include_router(admin_router)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

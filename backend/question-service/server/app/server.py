from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse

from utils.exception_handler import custom_http_exception_handler
from routers.questions import questions_router
from routers.admin import admin_router

app = FastAPI()

# Add custom exception handler
app.add_exception_handler(HTTPException, custom_http_exception_handler)

# Add routers
app.include_router(questions_router)
app.include_router(admin_router)

# Redirect root to docs
@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

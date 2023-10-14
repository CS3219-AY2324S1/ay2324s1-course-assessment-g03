from fastapi import HTTPException, Request
from utils.jsend import jsend_response, JSendStatus


def custom_http_exception_handler(request: Request, exc: HTTPException):
    """Custom exception handler to return JSend-style responses for HTTPExceptions"""
    return jsend_response(JSendStatus.ERROR, code=exc.status_code, message=exc.detail)

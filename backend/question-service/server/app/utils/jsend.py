
from enum import Enum
from fastapi.responses import JSONResponse


class JSendStatus(Enum):
    SUCCESS = "success"
    FAIL = "fail"


def jsend_response(status: JSendStatus, data=None, code=200, message=None):
    response = {"status": status.value}
    if data is not None:
        response["data"] = data
    if message is not None:
        response["message"] = message
    return JSONResponse(content=response, status_code=code)

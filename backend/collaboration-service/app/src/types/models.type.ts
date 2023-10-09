type JsendStatus = "success" | "fail" | "error"

type ModelResponse<T, U> =
    | { status: "success"; data: T, code: number }
    | { status: "fail" | "error"; data: U, code: number };
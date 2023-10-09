export type ModelResponse<T, U> =
    | { status: "success"; data: T, code: number }
    | { status: "fail" | "error"; data: U, code: number };

export const JSEND_STATUS = {
    SUCCESS: "success",
    FAILURE: "fail",
    ERROR: "error"
} as const;

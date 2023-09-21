export const API_ERROR = {
  NO_RESPONSE: "API Error: No response",
  INVALID_SHAPE: "API Error: Invalid response data shape",
  STATUS_FAIL: "API Error: Response status is 'fail'",
} as const;

export type ApiErrorType = (typeof API_ERROR)[keyof typeof API_ERROR];

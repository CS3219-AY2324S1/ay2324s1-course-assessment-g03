import { API_RESPONSE_STATUS } from "@/constants/api";

export type ApiResponseStatusType =
  (typeof API_RESPONSE_STATUS)[keyof typeof API_RESPONSE_STATUS];

import { env } from "@/lib/env";

export const API_URL = `${env.VITE_BACKEND_URL}/api`;

export const API_RESPONSE_STATUS = {
  SUCCESS: "success",
  FAIL: "fail",
} as const;

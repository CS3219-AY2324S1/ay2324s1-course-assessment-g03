import { env } from "@/lib/env";

export const API_URL = `${env.VITE_BACKEND_URL}/api`;

export const API_RESPONSE_STATUS = {
  SUCCESS: "success",
  FAIL: "fail",
} as const;

export const API_ENDPOINT = {
  /**
   * Auth module
   */
  AUTH: "/auth",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_GITHUB_AUTH_URL: "/auth/github/authorize",
  AUTH_GITHUB_LOGIN: "/auth/github/login",

  /**
   * Question service
   */
  QUESTIONS: "/questions",
  QUESTIONS_GET_ALL: "/questions/all",
  QUESTIONS_GET_FILTERS: "questions/filters",

  /**
   * User service
   */
  USERS: "/users",
} as const;

/**
 * Websocket paths
 */
export const WEBSOCKET_PATH = {
  MATCHING: "/api/matching/websocket",
  COLLABORATION: "/api/collaboration/websocket",
} as const;

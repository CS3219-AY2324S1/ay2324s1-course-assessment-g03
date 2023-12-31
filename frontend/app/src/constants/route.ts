export const ROUTE = {
  ROOT: "/",
  GITHUB_CALLBACK: "/github/callback",
  ROOM: "/room",
  ROOM_ROOMID: "/room/:roomId",
  HOME: "/home",
  HOME_JOIN: "/home/join",
  PROFILE: "/profile",
  PROFILE_USERID: "/profile/:userId",
  SETTINGS: "/settings",
  QUESTIONS: "/questions",
  QUESTION_ID: ":questionId",
} as const;

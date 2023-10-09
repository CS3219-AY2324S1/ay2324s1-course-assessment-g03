export const SOCKET_API = {
    CONNECT: "connection",
    ERROR: "error",
    PULL_UPDATES: "pullUpdates",
    PUSH_UPDATES: "pushUpdates",
    GET_DOCUMENT: "getDocument",
    DISCONNECT: "disconnect",
} as const;

export const SOCKET_INVALID_ROOM_ID = "Invalid roomId provided"
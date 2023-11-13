export const SOCKET_API = {
  CONNECT: "connection",
  ERROR: "error",
  DISCONNECT: "disconnect",
  CONNECT_RESPONSE: "connectResponse",
  DISCONNECT_RESPONSE: "disconnectResponse",
  CHAT_MESSAGE: "chatMessage",
  CHAT_MESSAGE_RESPONSE: "chatMessageResponse",
  GET_MESSAGES: "getMessages",
  GET_MESSAGES_RESPONSE: "getMessagesResponse",
} as const;

export const SOCKET_INVALID_ROOM_ID = "Invalid roomId provided";
export const SOCKET_INVALID_USER_ID = "Invalid userId provided";

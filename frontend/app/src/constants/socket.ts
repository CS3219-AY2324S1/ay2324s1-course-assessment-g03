export const COLLABORATION_SOCKET_API = {
    CONNECT: "connection",
    ERROR: "error",
    PULL_UPDATES: "pullUpdates",
    PUSH_UPDATES: "pushUpdates",
    GET_DOCUMENT: "getDocument",
    DISCONNECT: "disconnect",
    PUSH_UPDATES_RESPONSE: "pushUpdateResponse",
    PULL_UPDATES_RESPONSE: "pullUpdateResponse",
    GET_DOCUMENT_RESPONSE: "getDocumentResponse"
} as const;

export const COMMUNICATION_SOCKET_API = {
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
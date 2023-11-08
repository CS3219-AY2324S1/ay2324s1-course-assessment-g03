export const SOCKET_API = {
    CONNECT: "connection",
    ERROR: "error",
    PULL_UPDATES: "pullUpdates",
    PUSH_UPDATES: "pushUpdates",
    GET_DOCUMENT: "getDocument",
    DISCONNECT: "disconnect",
    PUSH_UPDATES_RESPONSE: "pushUpdateResponse",
    PULL_UPDATES_RESPONSE: "pullUpdateResponse",
    GET_DOCUMENT_RESPONSE: "getDocumentResponse",
    CONNECT_RESPONSE: "connectResponse",
    DISCONNECT_RESPONSE: "disconnectResponse",
    CHANGE_QUESTION: "changeQuestion",
    CHANGE_QUESTION_RESPONSE: "changeQuestionResponse",
    CHANGE_LANGUAGE: "changeLanguage",
    CHANGE_LANGUAGE_RESPONSE: "changeLanguageResponse"
} as const;

export const SOCKET_INVALID_ROOM_ID = "Invalid roomId provided"
export const SOCKET_INVALID_USER_ID = "Invalid userId provided"
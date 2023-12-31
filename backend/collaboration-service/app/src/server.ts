import http from "http";
import app from "./app";
import { Server } from "socket.io";
import {
  handleGetDocument,
  handleLanguageChange,
  handlePullUpdates,
  handlePushUpdates,
  handleQuestionChange,
} from "./helpers/socket.helper";
import { SOCKET_API, SOCKET_INVALID_ROOM_ID, SOCKET_INVALID_USER_ID } from "./constants/socket";
import { rooms } from "./db/rooms.db";
import { joinOneRoom, disconnectOneUserFromRoom } from "./models/rooms.model";
import { LanguageKeyType } from "./constants/language";

const port = process.env.PORT || 80;

export const server = http.createServer(app);

const io = new Server(server, {
  // options
  path: "/api/collaboration/websocket",
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on(SOCKET_API.CONNECT, (socket) => {
  const roomId = socket.handshake.query.roomId;
  const userId = socket.handshake.query.userId;

  if (typeof roomId !== "string" || !(roomId in rooms)) {
    socket.emit(SOCKET_API.ERROR, SOCKET_INVALID_ROOM_ID);
    socket.disconnect();
    return;
  }

  if (typeof userId !== "string" || userId === "undefined") {
    socket.emit(SOCKET_API.ERROR, SOCKET_INVALID_USER_ID);
    socket.disconnect();
    return;
  }

  socket.join(roomId);
  joinOneRoom(roomId, userId)
  socket.to(roomId).emit(SOCKET_API.CONNECT_RESPONSE, userId)

  /* Socket API to pull updates from the server */
  socket.on(SOCKET_API.PULL_UPDATES, (version: number) => {
    handlePullUpdates(socket, version, roomId);
  });

  /* Socket API to push updates to the server */
  socket.on(
    SOCKET_API.PUSH_UPDATES,
    (version: number, docUpdatesData: string) => {
      handlePushUpdates(socket, version, docUpdatesData, roomId);
    }
  );

  /* Socket API to get the current state of the document from the server */
  socket.on(SOCKET_API.GET_DOCUMENT, () => {
    handleGetDocument(socket, roomId);
  });

  /* Socket API to change the question */
  socket.on(SOCKET_API.CHANGE_QUESTION, (questionId: number) => {
    handleQuestionChange(socket, roomId, questionId)
  })

  socket.on(SOCKET_API.CHANGE_LANGUAGE, (language: string) => {
    handleLanguageChange(socket, roomId, language as LanguageKeyType)
  })

  /* Socket API to disconnect from the server */
  socket.on(SOCKET_API.DISCONNECT, () => {
    disconnectOneUserFromRoom(roomId, userId)
    socket.to(roomId).emit(SOCKET_API.DISCONNECT_RESPONSE, userId)
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

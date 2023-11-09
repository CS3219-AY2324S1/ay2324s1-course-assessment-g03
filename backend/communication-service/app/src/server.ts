import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { handleChatMessage, handleGetMessages } from "./helpers/socket.helper";
import {
  SOCKET_API,
  SOCKET_INVALID_ROOM_ID,
  SOCKET_INVALID_USER_ID,
} from "./constants/socket";
import { rooms } from "./db/rooms.db";
import { joinOneRoom, leaveOneRoom } from "./models/rooms.model";
import { User } from "./types/rooms/rooms.type";

const port = process.env.PORT || 80;

export const server = http.createServer(app);

const io: Server = new Server(server, {
  // options
  path: "/api/communication/websocket",
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on(SOCKET_API.CONNECT, (socket) => {
  console.log("A user connected");
  const roomId = socket.handshake.query.roomId;
  const user: User = socket.handshake.query as User;
  const userId = user.id;

  if (typeof roomId !== "string" || !(roomId in rooms)) {
    socket.emit(SOCKET_API.ERROR, SOCKET_INVALID_ROOM_ID);
    socket.disconnect();
    return;
  }

  if (typeof userId !== "string") {
    socket.emit(SOCKET_API.ERROR, SOCKET_INVALID_USER_ID);
    socket.disconnect();
    return;
  }

  socket.join(roomId);
  joinOneRoom(roomId, user);
  socket.to(roomId).emit(SOCKET_API.CONNECT_RESPONSE, userId);

  /* Socket API to handle chat messages sent by users to the server */
  socket.on(
    SOCKET_API.CHAT_MESSAGE,
    ({ userId, message }: { userId: string; message: string }) => {
      handleChatMessage(socket, io, roomId, userId, message);
    }
  );

  /* Socket API to fetch chat messages from the server */
  socket.on(SOCKET_API.GET_MESSAGES, () => {
    handleGetMessages(socket, roomId);
  });

  /* Socket API to disconnect from the server */
  socket.on(SOCKET_API.DISCONNECT, () => {
    leaveOneRoom(roomId, userId);
    socket.to(roomId).emit(SOCKET_API.DISCONNECT_RESPONSE, userId);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

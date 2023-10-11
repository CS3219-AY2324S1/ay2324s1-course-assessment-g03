import http from "http";
import app from "./app";
import { Server } from "socket.io";
import {
  handleGetDocument,
  handlePullUpdates,
  handlePushUpdates,
} from "./helpers/socket.helper";
import { SOCKET_API, SOCKET_INVALID_ROOM_ID } from "./constants/socket";

const port = process.env.PORT || 80;

export const server = http.createServer(app);

const io = new Server(server, {
  // options
  path: "/api/collaboration/websocket",
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on(SOCKET_API.CONNECT, (socket) => {
  const roomId = socket.handshake.query.roomId;

  if (typeof roomId !== "string") {
    socket.emit(SOCKET_API.ERROR, SOCKET_INVALID_ROOM_ID);
    socket.disconnect();
    return;
  }
  socket.join(roomId);

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

  /* Socket API to disconnect from the server */
  socket.on(SOCKET_API.DISCONNECT, () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

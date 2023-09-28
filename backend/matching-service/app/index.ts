import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

/**
 * Configuration
 */
dotenv.config({ path: `.env.development` });

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/**
 * Middleware
 */
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

/**
 * Routes
 */
app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to PeerPrep (Matching service) - A project for NUS CS3219 - Group 3"
  );
});

/**
 * Start the server
 */
httpServer.listen(process.env.PORT, () => {
  console.log(`Matching Service is live and running ⚡
Container URL: http://localhost:${process.env.PORT}
Local development URL: <TEMPLATE> (Refer to our discussion on which port your local dev should take)`);
});

interface Preferences {
  difficulty: string;
}

interface UserSocket {
  user: number;
  socket: Socket;
}

interface WaitingSocket {
  roomId: string;
  userSocket: UserSocket;
  preferences: Preferences;
}

class RoomsGateway {
  public roomIdToSockets: Map<string, UserSocket[]> = new Map();
  public waiting: WaitingSocket[] = [];
  private roomIdToLinkWaiting: Map<string, UserSocket> = new Map();

  constructor() {}

  async createRoom(socket: any) {
    socket.join("some room");
    this.waiting.push({
      roomId: "some room",
      preferences: { difficulty: "hard" },
      userSocket: { user: 1, socket },
    });
  }

  async joinRandomRoom(user: UserSocket, preferences: Preferences, socket: any) {
    let roomId: string;
    this.waiting.forEach((room) => {
      if (room.preferences.difficulty === preferences.difficulty) {
        roomId = room.roomId;
        socket.join(roomId);
        this.roomIdToSockets.set(roomId, [user, room.userSocket]);
      }
    });
    this.waiting.filter((room) => room.roomId != roomId);
  }
}

const rooms = new RoomsGateway();

io.on("connection", (socket) => {
  rooms.createRoom(socket);
  rooms.joinRandomRoom(
    { user: 2, socket},
    { difficulty: "hard" },
    socket
  );
  console.log(rooms.roomIdToSockets);
});

io.on("join", (socket, parsedValues) => {
  console.log(parsedValues);
})

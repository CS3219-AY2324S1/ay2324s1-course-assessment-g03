import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

/**
 * Configuration
 */
dotenv.config({ path: `.env.development` });

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
  },
});

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
  difficulty: string[];
  category: string[];
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

  createRoom(socket: any) {
    const roomId = uuidv4();
    socket.join(roomId);
    this.waiting.push({
      roomId: uuidv4(),
      preferences: {
        difficulty: ["Medium"],
        category: ["Array"],
      },
      userSocket: { user: 1, socket },
    });
  }

  joinRandomRoom(
    user: UserSocket,
    preferences: Preferences,
    socket: any
  ): string {
    let roomId: string = "";
    this.waiting.forEach((room) => {
      if (JSON.stringify(room.preferences) === JSON.stringify(preferences)) {
        // maybe use lodash for deep comparison
        roomId = room.roomId;
        console.log(roomId);
        socket.join(roomId);
        this.roomIdToSockets.set(roomId, [user, room.userSocket]);
      }
    });
    this.waiting.filter((room) => room.roomId != roomId);
    return roomId;
  }
}

const rooms = new RoomsGateway();

io.on("connection", (socket) => {
  socket.on("join", (preferences, callback) => {
    rooms.createRoom(socket);
    console.log(rooms.waiting);
    const roomId = rooms.joinRandomRoom(
      { user: 2, socket },
      preferences,
      socket
    );
    if (roomId) {
      console.log(roomId);
      callback({
        status: "joined",
        roomId,
      });
    }
  });
});

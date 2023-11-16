import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { MATCHING_EVENTS } from "./src/matching/matching.constants";
import { MatchingGateway } from "./src/matching/matching.gateway";
import { Preferences, User } from "./src/matching/matching.interfaces";

/**
 * Configuration
 */
dotenv.config({ path: `.env.development` });

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/api/matching/websocket",
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
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
Local development URL: http://localhost:8004`);
});

const matchingGateway = new MatchingGateway();

io.on("connection", (socket) => {
  socket.on(
    MATCHING_EVENTS.JOIN_ROOM,
    async (user: User, preferences: Preferences) => {
      try {
        const matched = await matchingGateway.joinRandomRoom({
          user,
          preferences,
        });

        if (matched) {
          socket.join(matched.user1.id);
          io.to(matched.user1.id).emit(MATCHING_EVENTS.FOUND_ROOM, matched);
        } else {
          socket.join(user.id);
        }
      } catch (error: any) {
        socket.emit(MATCHING_EVENTS.ERROR, error.message);
      }
    }
  );

  socket.on(MATCHING_EVENTS.LEAVE_ROOM, async (user: User) => {
    matchingGateway.leaveRoom(user);
  });
});

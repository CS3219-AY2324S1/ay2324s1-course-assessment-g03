import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { MATCHING_EVENTS } from "./src/matching/matching.constants";
import { MatchingGateway } from "./src/matching/matching.gateway";

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

const matchingGateway = new MatchingGateway();

io.on("connection", (socket) => {
  socket.on(MATCHING_EVENTS.JOIN_ROOM, (preferences, callback) => {
    matchingGateway.createRoom(socket);
    const roomId = matchingGateway.joinRandomRoom(
      { user: 2, socket },
      preferences,
      socket
    );
    if (roomId) {
      callback({
        status: MATCHING_EVENTS.JOINED_ROOM,
        roomId,
      });
    }
  });
});

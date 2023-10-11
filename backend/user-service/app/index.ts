import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

/**
 * Configuration
 */
dotenv.config({ path: `.env.development` });

const app: Application = express();

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
    "Welcome to PeerPrep (User service) - A project for NUS CS3219 - Group 3"
  );
});

/**
 * Start the server
 */
app.listen(process.env.PORT, () => {
  console.log(`API Gateway is live and running ⚡
Container URL: http://localhost:${process.env.PORT}
Local development URL: http://localhost:8002`);
});

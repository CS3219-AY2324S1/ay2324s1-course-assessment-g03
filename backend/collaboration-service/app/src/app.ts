import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routes/api";
import { HttpStatus } from "./utils/HTTP_Status_Codes";

dotenv.config({ path: `.env.development` });

const app: Express = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/collaboration", apiRouter);

export default app;

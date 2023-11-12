import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routes/api";

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

app.get("/", (req, res) => {
  {
    res.send(
      "Welcome to PeerPrep (Communication service) - A project for NUS CS3219 - Group 3"
    );
  }
});

app.use("/api/communication", apiRouter);

export default app;

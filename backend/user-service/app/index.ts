import dotenv from "dotenv";
dotenv.config({ path: `.env.development` });
import { envSchema } from "./types";

/**
 * Validate env variables (Do not allow deployment if env variables are not valid)
 */
if (process.env.NODE_ENV === "development") {
}
const envServerParsed = envSchema.safeParse(process.env);
if (!envServerParsed.success) {
  throw new Error("There is an error with the server environment variables");
}
process.env = envServerParsed.data;

import express, { Request, Response, Application } from "express";
import { morganConfig, corsConfig } from "./libs/config";
import { apiRouter } from "./routes";

/**
 * Loaders
 */
const app: Application = express();
app.use(morganConfig); // For logging
app.use(corsConfig);
app.use(express.json()); // For parsing application/json

/**
 * Routes
 */
app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to PeerPrep (User Service) - A project for NUS CS3219 - Group 3"
  );
});

app.use("/api", apiRouter);

/**
 * Start the server
 */
app.listen(process.env.PORT, () => {
  console.log(`User Service is live and running ⚡
Container URL: http://localhost:${process.env.PORT}
Local development URL: http://localhost:8002`);
});

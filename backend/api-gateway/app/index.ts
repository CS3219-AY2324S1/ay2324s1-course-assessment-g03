import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 80;
const USERS_SERVICE_URL =
  process.env.USERS_SERVICE_URL || "http://localhost:8001";

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PeerPrep");
});

app.use(
  "/api/users",
  createProxyMiddleware({
    target: USERS_SERVICE_URL,
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server (API Gateway) is running at http://localhost:${PORT}`);
});

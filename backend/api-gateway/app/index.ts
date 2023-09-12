import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

//TODO: Move to a separate file
// Constants
const GITHUB_AUTH_ENDPOINT = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";
const GITHUB_USER_EMAIL_ENDPOINT = "https://api.github.com/user/emails";

//For env File
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Application = express();
const PORT = 80;
const USERS_SERVICE_URL =
  process.env.USERS_SERVICE_URL || "http://localhost:8002";

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PeerPrep!");
});

/**
 * Auth Module
 */
app.get("/api/auth/github/authorize", async (req: Request, res: Response) => {
  const queryParams: Record<string, string> = {
    //TODO: Have env variable validation with Zod
    client_id: process.env.GITHUB_CLIENT_ID ?? "",
    redirect_uri: process.env.GITHUB_CALLBACK_URL ?? "",
    scope: "user:email",
    state: "TODO",
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const response = await fetch(`${GITHUB_AUTH_ENDPOINT}?${queryString}`);

  res.send({ url: response.url });
});

app.use("/api/auth/github/login", async (req: Request, res: Response) => {
  const { code, state } = req.query;
  //TODO: Validate state properly
  if (state !== "TODO") {
    return res.status(401).send({ error: "Invalid state" });
  }

  const queryParams: Record<string, string> = {
    //TODO: Have env variable validation with Zod
    client_id: process.env.GITHUB_CLIENT_ID ?? "",
    client_secret: process.env.GITHUB_CLIENT_SECRET ?? "",
    code: String(code),
  };

  const queryString = new URLSearchParams(queryParams).toString();

  // Use authorization code to get access token
  const tokenResponse = await fetch(`${GITHUB_TOKEN_ENDPOINT}?${queryString}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const tokenData = await tokenResponse.json();

  if (tokenData["error"]) {
    return res.status(401).send({
      error: tokenData["error"],
      error_description: tokenData["error_description"],
    });
  }

  if (!tokenData["access_token"]) {
    return res.status(401).send({ error: "Access token not found" });
  }

  const accessToken = tokenData["access_token"];

  // Use access token to get user info
  const userResponse = await fetch(GITHUB_USER_EMAIL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userData = await userResponse.json();

  res.send({ emails: userData });
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

import express, {
  Request,
  Response,
  Application,
  CookieOptions,
} from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import {
  GITHUB_AUTH_ENDPOINT,
  GITHUB_OAUTH_SCOPE,
  GITHUB_OAUTH_STATE,
  GITHUB_TOKEN_ENDPOINT,
  GITHUB_USER_EMAIL_ENDPOINT,
  GITHUB_USER_ENDPOINT,
} from "./libs/constants";
import { envSchema } from "./types";
import cookieParser from "cookie-parser";
import { successApiResponse, wrapJwt } from "./libs/utils";
import { authMiddleware } from "./libs/middleware";

/**
 * Validate env variables (Do not allow deployment if env variables are not valid)
 */
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const envServerParsed = envSchema.safeParse(process.env);
if (!envServerParsed.success) {
  console.error(envServerParsed.error.issues);
  throw new Error("There is an error with the server environment variables");
}
process.env = envServerParsed.data;

/**
 * Configurations
 */
const corsConfig = cors({
  credentials: true,
  origin: process.env.FRONTEND_ORIGIN,
});
const cookieParserConfig = cookieParser();
const cookieConfig: CookieOptions = {
  httpOnly: true, // To prevent XSS attacks, we set this to true
  secure: process.env.NODE_ENV !== "development" ? true : false,
  sameSite: process.env.NODE_ENV !== "development" ? "none" : false,
  domain:
    process.env.NODE_ENV !== "development"
      ? process.env.FRONTEND_ORIGIN
      : undefined,
};

/**
 * Loaders
 */
const app: Application = express();
app.use(corsConfig);
app.use(cookieParserConfig);

/**
 * Routes
 */
app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to PeerPrep (API Gateway) - A project for NUS CS3219 - Group 3"
  );
});

/**
 * Routes (Auth module)
 * // TODO: Split into its own router
 */
app.get("/api/auth", authMiddleware, (req: Request, res: Response) => {
  res.send(successApiResponse({ user: res.locals.user }));
});

app.get("/api/auth/github/authorize", async (req: Request, res: Response) => {
  const queryParams: Record<string, string> = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    scope: GITHUB_OAUTH_SCOPE,
    // TODO: Generate a random state from the frontend
    state: GITHUB_OAUTH_STATE,
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const response = await fetch(`${GITHUB_AUTH_ENDPOINT}?${queryString}`);

  res.send({ url: response.url });
});

app.get("/api/auth/github/login", async (req: Request, res: Response) => {
  const { code, state } = req.query;

  // Validating state to prevent CSRF
  if (state !== GITHUB_OAUTH_STATE) {
    return res.status(401).send({ error: "Invalid state" });
  }

  const queryParams: Record<string, string> = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
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

  // Use access token to get user info and emails
  const userPromise = fetch(GITHUB_USER_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const emailPromise = await fetch(GITHUB_USER_EMAIL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const promiseResponses = await Promise.all([userPromise, emailPromise]);

  const [userData, emailData] = await Promise.all(
    promiseResponses.map(async (response) => await response.json())
  );

  // TODO: Check `Account` to see if user exists

  // TODO: If user does not exist in `Account`

  // TODO: - Call user service to check if user exists

  // TODO: - - If user does not exist, create new user with user service

  // TODO: - Create new Account record

  // Log the user in by setting JWT in cookie
  const jwtPayload = {
    email: emailData[0]["email"],
  };
  const token = wrapJwt(jwtPayload);

  res.cookie(process.env.JWT_COOKIE_NAME, token, cookieConfig);
  return res.send(successApiResponse({ message: "Successfully logged in" }));
});

app.post("/api/auth/logout", (req: Request, res: Response) => {
  res.clearCookie(process.env.JWT_COOKIE_NAME);
  return res.send(successApiResponse({ message: "Successfully logged out" }));
});

/**
 * Routes (API Gateway)
 */
app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USERS_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  "/api/questions",
  createProxyMiddleware({
    target: process.env.QUESTIONS_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  "/api/matching",
  createProxyMiddleware({
    target: process.env.MATCHING_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  "/api/collaboration",
  createProxyMiddleware({
    target: process.env.COLLABORATION_SERVICE_URL,
    changeOrigin: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`API Gateway is live and running ⚡
Container URL: http://localhost:${process.env.PORT}
Local development URL: http://localhost:8001`);
});

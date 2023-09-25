import { Router, Request, Response } from "express";
import {
  authMiddleware,
  successApiResponse,
  GITHUB_OAUTH_SCOPE,
  GITHUB_OAUTH_STATE,
  GITHUB_AUTH_ENDPOINT,
  GITHUB_TOKEN_ENDPOINT,
  GITHUB_USER_ENDPOINT,
  GITHUB_USER_EMAIL_ENDPOINT,
  wrapJwt,
} from "../libs";
import { cookieOptions } from "../libs/config";

export const authRouter = Router();

/**
 * Routes (Auth module)
 */
authRouter.get("/", authMiddleware, (req: Request, res: Response) => {
  res.send(successApiResponse({ user: res.locals.user }));
});

authRouter.get("/github/authorize", async (req: Request, res: Response) => {
  const queryParams: Record<string, string> = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    scope: GITHUB_OAUTH_SCOPE,
    // TODO: Generate a random state from the frontend
    state: GITHUB_OAUTH_STATE,
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const response = await fetch(`${GITHUB_AUTH_ENDPOINT}?${queryString}`);

  res.send(successApiResponse({ url: response.url }));
});

authRouter.get("/github/login", async (req: Request, res: Response) => {
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

  const emailPromise = fetch(GITHUB_USER_EMAIL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const promiseResponses = await Promise.all([userPromise, emailPromise]);

  const [userData, emailData] = await Promise.all(
    promiseResponses.map(async (response) => await response.json())
  );

  const userObject = {
    name: userData["name"],
    email: emailData[0]["email"],
    avatarUrl: userData["avatar_url"],
  };

  // TODO: Call user service to upsert user data based on email

  // TODO: Validate user data response from user service

  // Log the user in by setting JWT in cookie
  const jwtPayload = { ...userObject };

  const token = wrapJwt(jwtPayload);

  res.cookie(process.env.JWT_COOKIE_NAME, token, cookieOptions);
  return res.send(successApiResponse({ message: "Successfully logged in" }));
});

authRouter.post("/logout", (req: Request, res: Response) => {
  res.clearCookie(process.env.JWT_COOKIE_NAME);
  return res.send(successApiResponse({ message: "Successfully logged out" }));
});

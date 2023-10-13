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
  getPrimaryEmail,
  failApiResponse,
} from "../libs";
import { cookieOptions } from "../libs/config";
import {
  githubEmailResponseSchema,
  githubUserResponseSchema,
} from "../types/github";
import { getUserSchema } from "../types/usersService";
import { HTTP_STATUS } from "../types";
import { User } from "../types/user";

export const authRouter = Router();

/**
 * Routes (Auth module)
 */
authRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
  const primaryEmail = res.locals.user.email;

  // Fetch user from user service (as data in JWT may be outdated)
  try {
    const getUserResponse = await fetch(
      `${process.env.USERS_SERVICE_URL}/api/users/email/${primaryEmail}`
    );
    const getUserData = await getUserResponse.json();
    const safeParsedUserServiceData = getUserSchema.safeParse(getUserData);

    if (!safeParsedUserServiceData.success) {
      return res.status(500).send(
        failApiResponse({
          error: `Failed to parse response from user service GET ${
            process.env.USERS_SERVICE_URL
          }/api/users/email\n\Reason: ${JSON.stringify(
            safeParsedUserServiceData.error
          )}`,
        })
      );
    }

    const parsedUserServiceData = safeParsedUserServiceData.data;

    if (parsedUserServiceData.status === HTTP_STATUS.FAIL) {
      res.clearCookie(process.env.JWT_COOKIE_NAME);
      return res.status(401).send(
        failApiResponse({
          error: `User with email ${primaryEmail} does not exist in user service`,
        })
      );
    }

    return res.send(
      successApiResponse({ user: parsedUserServiceData.data.user })
    );
  } catch (error) {
    return res.status(500).send(
      failApiResponse({
        error: error instanceof Error ? error.message : "An error has occurred",
      })
    );
  }
});

authRouter.get("/github/authorize", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send(
      failApiResponse({
        error: error instanceof Error ? error.message : "An error has occurred",
      })
    );
  }
});

authRouter.get("/github/login", async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;

    // Validating state to prevent CSRF
    if (state !== GITHUB_OAUTH_STATE) {
      return res.status(401).send(failApiResponse({ error: "Invalid state" }));
    }

    const queryParams: Record<string, string> = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: String(code),
    };

    const queryString = new URLSearchParams(queryParams).toString();

    // Use authorization code to get access token
    const tokenResponse = await fetch(
      `${GITHUB_TOKEN_ENDPOINT}?${queryString}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const tokenData = await tokenResponse.json();

    if (tokenData["error"]) {
      return res.status(401).send(
        failApiResponse({
          error: tokenData["error"],
          error_description: tokenData["error_description"],
        })
      );
    }

    if (!tokenData["access_token"]) {
      return res
        .status(401)
        .send(failApiResponse({ error: "Access token not found" }));
    }

    const accessToken = tokenData["access_token"];

    // Use access token to get user email from GitHub
    const emailResponse = await fetch(GITHUB_USER_EMAIL_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const emailData = await emailResponse.json();

    const safeParsedEmailData = githubEmailResponseSchema.safeParse(emailData);

    if (!safeParsedEmailData.success) {
      return res.status(500).send(
        failApiResponse({
          error: `Failed to parse response from GitHub GET ${GITHUB_USER_EMAIL_ENDPOINT}`,
        })
      );
    }

    const primaryEmail = getPrimaryEmail(safeParsedEmailData.data);

    if (!primaryEmail) {
      return res
        .status(500)
        .send(
          failApiResponse({
            error: "Primary GitHub email not found in response",
          })
        );
    }

    // Check if user exists in database
    const getUserResponse = await fetch(
      `${process.env.USERS_SERVICE_URL}/api/users/email/${primaryEmail}`
    );
    const getUserData = await getUserResponse.json();
    const safeParsedUserServiceData = getUserSchema.safeParse(getUserData);

    if (!safeParsedUserServiceData.success) {
      return res.status(500).send(
        failApiResponse({
          error: `Failed to parse response from user service GET ${
            process.env.USERS_SERVICE_URL
          }/api/users/email\n\Reason: ${JSON.stringify(
            safeParsedUserServiceData.error
          )}`,
        })
      );
    }

    const parsedUserServiceData = safeParsedUserServiceData.data;

    // The user object to be populated and then encoded in the JWT
    let user: User | undefined = undefined;
    // User does not exist => Create a new user in the service
    if (parsedUserServiceData.status === HTTP_STATUS.FAIL) {
      console.log(
        `User with email ${primaryEmail} does not exist in user service`
      );
      // Get user data from GitHub
      const userResponse = await fetch(GITHUB_USER_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await userResponse.json();
      const safeParsedUserData = githubUserResponseSchema.safeParse(userData);

      if (!safeParsedUserData.success) {
        return res.status(500).send(
          failApiResponse({
            error: `Failed to parse response from GitHub GET ${GITHUB_USER_ENDPOINT}`,
          })
        );
      }

      const parsedUserData = safeParsedUserData.data;

      // Build the new user object
      const userObject: Partial<User> = {
        email: primaryEmail,
      };

      if (parsedUserData.avatar_url) {
        userObject["avatarUrl"] = parsedUserData.avatar_url;
      }
      if (parsedUserData.name) {
        userObject["name"] = parsedUserData.name;
      }

      const createUserResponse = await fetch(
        `${process.env.USERS_SERVICE_URL}/api/users`,
        {
          method: "POST",
          body: JSON.stringify({ user: userObject }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      const createUserData = await createUserResponse.json();

      const safeParsedCreateUserData = getUserSchema.safeParse(createUserData);

      if (!safeParsedCreateUserData.success) {
        return res.status(500).send(
          failApiResponse({
            error: `Failed to parse response from user service POST ${process.env.USERS_SERVICE_URL}/api/users`,
          })
        );
      }

      const parsedCreateUserData = safeParsedCreateUserData.data;

      if (parsedCreateUserData.status === HTTP_STATUS.FAIL) {
        return res.status(500).send(
          failApiResponse({
            error: `Failed to create user in user service`,
          })
        );
      }

      user = parsedCreateUserData.data.user;
    } else {
      console.log(
        `User with email ${primaryEmail} already exists in user service`
      );
      user = parsedUserServiceData.data.user;
    }

    if (!user) {
      return res.status(500).send(
        failApiResponse({
          error: `Failed to create/generate user in user service`,
        })
      );
    }

    // Log the user in by setting JWT in cookie
    const jwtPayload = { ...user };

    const token = wrapJwt(jwtPayload);

    res.cookie(process.env.JWT_COOKIE_NAME, token, cookieOptions);
    return res.send(successApiResponse({ message: "Successfully logged in" }));
  } catch (error) {
    return res.status(500).send(
      failApiResponse({
        error: error instanceof Error ? error.message : "An error has occurred",
      })
    );
  }
});

authRouter.post("/logout", (req: Request, res: Response) => {
  res.clearCookie(process.env.JWT_COOKIE_NAME);
  return res.send(successApiResponse({ message: "Successfully logged out" }));
});

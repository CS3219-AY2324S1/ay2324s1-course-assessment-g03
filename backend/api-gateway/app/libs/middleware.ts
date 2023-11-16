import { RequestHandler } from "express";
import { failApiResponse, unwrapJwt } from "./utils";
import { HTTP_STATUS, HTTP_STATUS_CODE } from "../types";
import { ROLE, User, userSchema } from "../types/user";
import { API_GATEWAY_AUTH_SECRET } from "./constants";
import { getUserSchema } from "../types/usersService";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  // If the auth secret is provided in the header, bypass the auth middleware
  if (
    req.headers[API_GATEWAY_AUTH_SECRET] === process.env.API_GATEWAY_AUTH_SECRET
  ) {
    next();
    return;
  }

  /**
   * Retrieve JWT from cookies
   */
  const token = req.cookies[process.env.JWT_COOKIE_NAME];

  /**
   * Validate JWT with secret
   * As the JWT was symmetrically signed with the secret, we can verify its legitimacy with the secret
   */
  let data: User | undefined = undefined;
  try {
    data = await unwrapJwt(token, userSchema);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .send(failApiResponse({ message: "User is not authenticated" }));
  }

  if (!data) {
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .send(failApiResponse({ message: "User data is missing" }));
  }
  // User is authenticated
  res.locals.user = { ...data };
  next();
};

/**
 * Auth middleware has to be called before this
 */
export const adminMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const safeParsedUser = userSchema.safeParse(res.locals.user);
    if (!safeParsedUser.success) {
      return res.status(500).send(
        failApiResponse({
          error: `Failed to parse user data from auth middleware\n\Reason:\n${JSON.stringify(
            safeParsedUser.error
          )}`,
        })
      );
    }

    const primaryEmail = safeParsedUser.data.email;

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
          }/api/users/email\n\Reason:\n${JSON.stringify(
            safeParsedUserServiceData.error
          )}`,
        })
      );
    }

    const parsedUserServiceData = safeParsedUserServiceData.data;

    if (parsedUserServiceData.status === HTTP_STATUS.FAIL) {
      return res.status(401).send(
        failApiResponse({
          error: `User with email ${primaryEmail} does not exist in user service`,
        })
      );
    }

    const userData = parsedUserServiceData.data.user;

    if (userData.role === ROLE.ADMIN) {
      next();
    } else {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send(
        failApiResponse({
          message: "User is not authorized to perform this action",
        })
      );
    }
  } catch (error) {
    return res.status(500).send(
      failApiResponse({
        error: `An error occurred: ${
          error instanceof Error ? error.message : error
        }`,
      })
    );
  }
};

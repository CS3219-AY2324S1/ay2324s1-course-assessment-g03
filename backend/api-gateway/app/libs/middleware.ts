import { RequestHandler } from "express";
import { failApiResponse, unwrapJwt } from "./utils";
import { HTTP_STATUS_CODE } from "../types";
import { ROLE, User, userSchema } from "../types/user";
import { API_GATEWAY_AUTH_SECRET } from "./constants";

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

export const adminMiddleware: RequestHandler = async (req, res, next) => {
  authMiddleware(req, res, next);

  const userData = userSchema.parse(res.locals.user);

  if (userData.role === ROLE.ADMIN) {
    next();
  } else {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send(
      failApiResponse({
        message: "User is not authorized to perform this action",
      })
    );
  }
};

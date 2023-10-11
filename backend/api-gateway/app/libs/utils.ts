import { z } from "zod";
import { HTTP_STATUS } from "../types";
import jwt from "jsonwebtoken";
import { GithubEmailResponse } from "../types/github";

/**
 * API Utils
 */
export const successApiResponse = (data: any) => ({
  status: HTTP_STATUS.SUCCESS,
  data,
});

export const failApiResponse = (data: any) => ({
  status: HTTP_STATUS.FAIL,
  data,
});

/**
 * JWT Utils
 */
export const wrapJwt = (data: Record<string, string>) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

export const unwrapJwt = (
  token: string,
  schema: z.ZodTypeAny
): Promise<z.infer<typeof schema>> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err); // Reject with the error if verification fails
      } else {
        const parsedContents = schema.safeParse(decoded);
        if (!parsedContents.success) {
          reject(parsedContents.error);
        } else {
          resolve(parsedContents.data); // Resolve with the decoded data if verification succeeds
        }
      }
    });
  });
};

/**
 * GitHub Auth Utils
 */
export const getPrimaryEmail = (githubEmailResponse: GithubEmailResponse) => {
  return githubEmailResponse.find((email) => email.primary)?.email;
};

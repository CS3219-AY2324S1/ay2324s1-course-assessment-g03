import { HTTP_STATUS } from "../types";
import jwt from "jsonwebtoken";

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

export const unwrapJwt = <T>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err); // Reject with the error if verification fails
      } else {
        const data = decoded as T;
        resolve(data); // Resolve with the decoded data if verification succeeds
      }
    });
  });
};

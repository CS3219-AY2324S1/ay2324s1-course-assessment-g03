import { HTTP_STATUS } from "../types";

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

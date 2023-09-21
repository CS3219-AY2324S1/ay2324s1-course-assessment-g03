import axios, { AxiosResponse, AxiosError } from "axios";
import { API_RESPONSE_STATUS, API_URL } from "@/constants/api";
import { API_ERROR } from "@/constants/error";
import { z } from "zod";
import { makeSuccessResponseSchema } from "./api";

export const backendApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Only used in @/lib/axios to type the response of the backendApi.
 * If the status is fail, an error will be thrown.
 * So any response passed to react-query will be guaranteed to be success.
 */
const failResponseSchema = z.object({
  status: z.literal(API_RESPONSE_STATUS.FAIL),
  data: z.object({ message: z.string() }),
});

export const anyApiResponseSchema = z.union([
  makeSuccessResponseSchema(z.any()),
  failResponseSchema,
]);
export type AnyApiResponse = z.infer<typeof anyApiResponseSchema>;

/**
 * To validate that the API response shape adheres to the ApiResponse type
 */
function responseHandler(response: AxiosResponse | undefined) {
  if (!response) {
    throw new Error(API_ERROR.NO_RESPONSE);
  }

  const parsedResponseData = anyApiResponseSchema.safeParse(response.data);

  if (!parsedResponseData.success) {
    throw new Error(API_ERROR.INVALID_SHAPE);
  }

  if (parsedResponseData.data.status === API_RESPONSE_STATUS.FAIL) {
    // Whitelisted responses that should fail silently
    if (parsedResponseData.data.data.message === "User is not authenticated") {
      return response;
    }

    throw new Error(
      parsedResponseData.data.data.message ?? API_ERROR.STATUS_FAIL,
    );
  }

  return response;
}

function errorHandler(error: AxiosError) {
  return responseHandler(error.response);
}

backendApi.interceptors.response.use(responseHandler, errorHandler);

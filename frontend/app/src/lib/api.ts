import { API_RESPONSE_STATUS } from "@/constants/api";
import { z } from "zod";

/**
 * For typing the response custom API fetching hooks.
 */
export const makeSuccessResponseSchema = <SuccessDataType extends z.ZodTypeAny>(
  successDataType: SuccessDataType,
) =>
  z.object({
    status: z.literal(API_RESPONSE_STATUS.SUCCESS),
    data: successDataType,
  });

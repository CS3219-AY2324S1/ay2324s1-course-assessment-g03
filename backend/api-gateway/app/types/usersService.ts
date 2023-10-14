import { z } from "zod";
import { HTTP_STATUS } from "./http";
import { userSchema } from "./user";

export const getUserSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      user: userSchema,
    }),
  }),
  z.object({
    status: z.literal(HTTP_STATUS.FAIL),
    data: z.object({
      message: z.string(),
    }),
  }),
]);

export const createUserSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      user: userSchema,
    }),
  }),
  z.object({
    status: z.literal(HTTP_STATUS.FAIL),
    data: z.object({
      message: z.string(),
    }),
  }),
]);

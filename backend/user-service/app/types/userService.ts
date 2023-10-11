import { z } from "zod";
import { HTTP_STATUS } from "./http";
import { userSchema } from "./user";

// TODO: TBC
export const getUserSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      user: userSchema,
    }),
  }),
  z.object({
    status: z.literal(HTTP_STATUS.FAIL),
  }),
]);

// TODO: TBC
export const createUserSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      user: userSchema,
    }),
  }),
  z.object({
    status: z.literal(HTTP_STATUS.FAIL),
  }),
]);

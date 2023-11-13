import { z } from "zod";
import { HTTP_STATUS } from "./http";
import { userSchema } from "./user";
import { submissionSchema } from "./submission";

export const getUserSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      user: userSchema.extend({
        submissions: z.array(submissionSchema),
      }),
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

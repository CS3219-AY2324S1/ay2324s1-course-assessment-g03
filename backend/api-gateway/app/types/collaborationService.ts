import { z } from "zod";
import { HTTP_STATUS } from "./http";

export const getRoomIdFromUserIdSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      roomId: z.string().optional(),
      userId: z.string(),
    }),
  }),
  z.object({
    status: z.literal(HTTP_STATUS.FAIL),
    data: z.object({
      message: z.string(),
    }),
  }),
]);

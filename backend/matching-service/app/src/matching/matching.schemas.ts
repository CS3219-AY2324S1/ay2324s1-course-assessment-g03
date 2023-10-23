import { z } from "zod";
import { HTTP_STATUS } from "../types/http";

export const createRoomSchema = z.union([
  z.object({
    status: z.literal(HTTP_STATUS.SUCCESS),
    data: z.object({
      created: z.string(),
      roomId: z.string(),
    }),
  }),
  z.object({
    status: z.literal(HTTP_STATUS.FAIL),
    data: z.object({
      message: z.string(),
    }),
  }),
]);

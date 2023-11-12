import { z } from "zod";

export const postRoomRequestSchema = z.object({
  body: z.object({
    roomId: z.string(),
  }),
});

export const getOneRoomByUserIdSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export const getOneRoomByIdSchema = z.object({
  params: z.object({
    roomId: z.string(),
  }),
});

export const deleteOneRoomByUserIdSchema = z.object({
  params: z.object({
    roomId: z.string(),
    userId: z.string(),
  }),
});
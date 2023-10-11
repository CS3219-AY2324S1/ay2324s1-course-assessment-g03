import { z } from "zod";

export const userBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url()
});

export type UserBody = z.infer<typeof userBodySchema>;

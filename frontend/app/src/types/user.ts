import { z } from "zod";

export const userSchema = z.object({
  // TODO: Remove optional once settled
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
});

export type User = z.infer<typeof userSchema>;

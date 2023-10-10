import { z } from "zod";

export const userSchema = z.object({
  // TODO: Remove optional once settled
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional().nullable(),
});

export type User = z.infer<typeof userSchema>;

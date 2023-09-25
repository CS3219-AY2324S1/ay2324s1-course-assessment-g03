import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email().nonempty(),
  avatarUrl: z.string().url(),
});

export type User = z.infer<typeof userSchema>;

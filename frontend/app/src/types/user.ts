import { z } from "zod";

export const userSchema = z.object({
  // TODO: Remove optional once settled
  id: z.string().optional(),
  name: z
    .string()
    .optional()
    .nullable()
    .transform(val => val ?? undefined),
  email: z.string().email(),
  avatarUrl: z
    .string()
    .url()
    .optional()
    .nullable()
    .transform(val => val ?? undefined),
});

export type User = z.infer<typeof userSchema>;

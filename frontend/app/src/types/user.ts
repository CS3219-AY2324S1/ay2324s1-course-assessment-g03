import { z } from "zod";

export const userSchema = z.object({
  // TODO: Remove optional once settled
  id: z.string().optional(),
  email: z.string().email(),
  /**
   * Coerces any null values to undefined.
   * This is done as GitHub returns null values
   */
  name: z
    .string()
    .optional()
    .nullable()
    .transform(val => val ?? undefined),
  avatarUrl: z
    .string()
    .url()
    .optional()
    .nullable()
    .transform(val => val ?? undefined),
});

export type User = z.infer<typeof userSchema>;

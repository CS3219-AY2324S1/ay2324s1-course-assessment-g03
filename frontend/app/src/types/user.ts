import { z } from "zod";

export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};
export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export const userSchema = z.object({
  id: z.number(),
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
  role: z.nativeEnum(ROLE),
});

export type User = z.infer<typeof userSchema>;

import { z } from "zod";

export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export const userSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email().nonempty(),
  avatarUrl: z.string().url(),
  role: z.nativeEnum(ROLE).optional(),
});

export type User = z.infer<typeof userSchema>;

import { z } from "zod";

export const ROLE = {
  ADMIN: "admin",
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email().nonempty(),
  avatarUrl: z.string().url(),
  roles: z.array(z.enum([ROLE.ADMIN])).optional(),
});

export type User = z.infer<typeof userSchema>;

import { z } from "zod";

export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export const userSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .nullish()
    .transform((val) => val ?? undefined),
  email: z.string().email().nonempty(),
  avatarUrl: z
    .string()
    .url()
    .nullish()
    .transform((val) => val ?? undefined),
  role: z.nativeEnum(ROLE),
});

export type User = z.infer<typeof userSchema>;

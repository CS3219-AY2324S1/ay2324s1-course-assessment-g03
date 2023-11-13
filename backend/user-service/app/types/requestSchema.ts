import { Role } from "@prisma/client";
import { z } from "zod";

export const userGetByIdSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export const userGetByEmailSchema = z.object({
  params: z.object({
    email: z.string(),
  }),
});

export const userPostSchema = z.object({
  body: z.object({
    user: z.object({
      email: z.string().email(),
      avatarUrl: z.string().url().optional(),
      name: z.string().optional(),
      role: z.nativeEnum(Role).optional(),
    }),
  }),
});

export const userPutSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    user: z.object({
      email: z.string().email().optional(),
      avatarUrl: z.string().url().optional(),
      name: z.string().optional(),
      role: z.nativeEnum(Role).optional(),
    }),
  }),
});

export const userDeleteSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export const submissionPostSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    submission: z.object({
      otherUserId: z.number().optional(), // If other user has left
      questionId: z.string(),
      code: z.string(),
      lang: z.string(),
    }),
  }),
});

export const submissionDeleteSchema = z.object({
  params: z.object({
    submissionId: z.string(),
  }),
});

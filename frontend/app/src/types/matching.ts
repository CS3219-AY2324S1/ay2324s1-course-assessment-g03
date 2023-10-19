import { z } from "zod";

import { MATCHING_EVENTS } from "@/constants/matching";
import { DIFFICULTY, TOPIC_TAG } from "@/constants/question";
import { userSchema } from "./user";

export type MatchingStatusType =
  (typeof MATCHING_EVENTS)[keyof typeof MATCHING_EVENTS];

export const preferenceSchema = z.object({
  difficulties: z.array(z.nativeEnum(DIFFICULTY)),
  topics: z.array(z.nativeEnum(TOPIC_TAG)),
});

export type Preferences = z.infer<typeof preferenceSchema>;

export const matchingSchema = z.object({
  user1: userSchema,
  user2: userSchema,
  roomId: z.string(),
  preferences: preferenceSchema,
});

export type Matching = z.infer<typeof matchingSchema>;

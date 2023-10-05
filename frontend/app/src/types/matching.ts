import { z } from "zod";

import { MATCHING_EVENTS } from "@/constants/matching";
import { DifficultyType, TopicTagType } from "@/constants/question";

export type MatchingStatusType =
  (typeof MATCHING_EVENTS)[keyof typeof MATCHING_EVENTS];

export type Preferences = {
  difficulty: DifficultyType[];
  category: TopicTagType[];
};

export const matchingSchema = z.object({
  status: z.nativeEnum(MATCHING_EVENTS),
  roomId: z.string(),
});

export type Matching = z.infer<typeof matchingSchema>;

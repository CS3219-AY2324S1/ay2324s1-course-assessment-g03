import { z } from "zod";

import { DifficultyType, TopicTagType } from "@/constants/question";

export type Preferences = {
  difficulty: DifficultyType[];
  category: TopicTagType[];
};

export const matchingSchema = z.object({
  status: z.string(),
  roomId: z.string(),
});

export type Matching = z.infer<typeof matchingSchema>;

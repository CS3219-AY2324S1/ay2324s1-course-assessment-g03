import { DifficultyType, TopicTagType } from "@/constants/question";

export type Preferences = {
  difficulty: DifficultyType[] | undefined;
  category: TopicTagType[] | undefined;
};

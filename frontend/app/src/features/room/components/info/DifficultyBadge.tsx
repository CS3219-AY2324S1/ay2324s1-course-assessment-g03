import { DifficultyType, DIFFICULTY } from "@/constants/question";
import { Tag } from "@chakra-ui/react";

interface DifficultyBadgeProps {
  difficulty: DifficultyType;
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const colorSchemes: Record<DifficultyType, string> = {
    [DIFFICULTY.EASY]: "green",
    [DIFFICULTY.MEDIUM]: "yellow",
    [DIFFICULTY.HARD]: "red",
  };

  return <Tag variant={colorSchemes[difficulty]}>{difficulty}</Tag>;
};

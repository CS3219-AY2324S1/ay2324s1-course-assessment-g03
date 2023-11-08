import { DifficultyType, DIFFICULTY } from "@/constants/question";
import { Tag } from "@chakra-ui/react";

interface DifficultyBadgeProps {
  difficulty: DifficultyType;
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const colorSchemes: Record<DifficultyType, string> = {
    // TODO: Figure out why prettier is not working
    [DIFFICULTY.EASY]: "green.600",
    [DIFFICULTY.MEDIUM]: "yellow",
    [DIFFICULTY.HARD]: "red",
  };

  return (
    <Tag
      bg={colorSchemes[difficulty]}
      border="none"
      fontWeight="bold"
      borderRadius="full"
      px={3}
      py={1}
    >
      {difficulty}
    </Tag>
  );
};

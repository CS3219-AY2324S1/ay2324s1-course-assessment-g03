import { DifficultyType, DIFFICULTY } from "@/constants/question";
import { Tag } from "@chakra-ui/react";

interface DifficultyBadgeProps {
  difficulty: DifficultyType;
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const colorSchemes: Record<DifficultyType, string> = {
    // TODO: Figure out why prettier is not working
    [DIFFICULTY.EASY]: "green.500",
    [DIFFICULTY.MEDIUM]: "yellow.500",
    [DIFFICULTY.HARD]: "red.500",
  };

  return (
    <Tag
      bg={colorSchemes[difficulty]}
      border="none"
      color="white"
      fontWeight="bold"
      borderRadius="full"
      px={3}
      py={1}
    >
      {difficulty}
    </Tag>
  );
};

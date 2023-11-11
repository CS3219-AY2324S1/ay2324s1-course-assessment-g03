export const DIFFICULTY = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
} as const;

export type DifficultyType = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

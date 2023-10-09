import { DifficultyType, DIFFICULTY } from "@/constants/question"
import { Badge } from "@chakra-ui/react"

interface DifficultyBadgeProps {
    difficulty: DifficultyType
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {

    const colorSchemes: Record<DifficultyType, string> = {
        // TODO: Figure out why prettier is not working
        [DIFFICULTY.EASY]: 'green',
        [DIFFICULTY.MEDIUM]: "yellow",
        [DIFFICULTY.HARD]: "red",
    }

    return <Badge colorScheme={colorSchemes[difficulty]} variant="outline">{difficulty}</Badge>
}
import { DifficultyType } from "@/constants/question"
import { Badge } from "@chakra-ui/react"

interface DifficultyBadgeProps {
    difficulty: DifficultyType
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {

    const colorSchemes: Record<DifficultyType, string> = {
        "Easy": "green",
        "Medium": "yellow",
        "Hard": "red"
    }

    return <Badge colorScheme={colorSchemes[difficulty]} variant="outline">Easy</Badge>
}
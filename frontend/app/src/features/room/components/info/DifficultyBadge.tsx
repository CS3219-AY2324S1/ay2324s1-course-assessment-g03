import { DifficultyType } from "@/constants/question"
import { Badge } from "@chakra-ui/react"

interface Props {
    difficulty: DifficultyType
}



export const DifficultyBadge: React.FC<Props> = ({ difficulty }) => {

    const colorSchemes: Record<DifficultyType, string> = {
        "Easy": "green",
        "Medium": "yellow",
        "Hard": "red"
    }

    return <Badge colorScheme={colorSchemes[difficulty]} variant="outline">Easy</Badge>
}
import { Badge } from "@chakra-ui/react"

interface TopicBadgeProps {
    topic: string;
}

export const TopicBadge = ({ topic }: TopicBadgeProps) => {
    return (
        <Badge colorScheme="gray" variant="outline" textTransform={"capitalize"} fontWeight={"normal"}>
            {topic}
        </Badge>
    )

}
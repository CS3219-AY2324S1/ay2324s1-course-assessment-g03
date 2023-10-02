import { Badge } from "@chakra-ui/react"

interface Props {
    topic: string;
}

export const TopicBadge: React.FC<Props> = ({ topic }) => {
    return (
        <Badge colorScheme="gray" variant="outline" textTransform={"capitalize"} fontWeight={"normal"}>
            {topic}
        </Badge>
    )

}
import { HStack } from "@chakra-ui/react"
import { DifficultyBadge, TopicBadge } from "@/features/room"
import { DifficultyType } from "@/constants/question"
import { UserCard } from "@/features/matching"

interface InfoBarProps {
    difficulty: DifficultyType;
    topic: string;
}

export const InfoBar = ({ difficulty, topic }: InfoBarProps) => {
    return (
        <HStack justifyContent={"space-between"}>
            <HStack>
                <UserCard user={undefined} />
                <UserCard user={undefined} />
            </HStack>
            <HStack>
                <DifficultyBadge difficulty={difficulty} />
                <TopicBadge topic={topic} />
            </HStack>
        </HStack>
    )
}
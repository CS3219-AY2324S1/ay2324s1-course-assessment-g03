import { HStack } from "@chakra-ui/react";
import { DifficultyBadge, TopicBadge } from "@/features/room";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { RoomUserInfo } from "./RoomUserInfo";

interface InfoBarProps {
  difficulty: DifficultyType[];
  topic: TopicTagType[];
  users: { id: string; connected: boolean; }[];
}

export const InfoBar = ({ difficulty, topic, users }: InfoBarProps) => {
  return (
    <HStack justifyContent={"space-between"}>
      <HStack>
        {users.map((user) => (<RoomUserInfo key={user.id} user={user} />))}
      </HStack>
      <HStack>
        {difficulty.map((d) => <DifficultyBadge key={d} difficulty={d} />)}
        {topic.map((t) => <TopicBadge key={t} topic={t} />)}
      </HStack>
    </HStack >
  );
};

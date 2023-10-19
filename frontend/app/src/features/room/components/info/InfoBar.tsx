import { HStack } from "@chakra-ui/react";
import { DifficultyBadge, TopicBadge } from "@/features/room";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { User } from "@/types/user";

interface InfoBarProps {
  difficulty: DifficultyType[];
  topic: TopicTagType[];
  users: User[];
}

export const InfoBar = ({ difficulty, topic, users }: InfoBarProps) => {

  return (
    <HStack justifyContent={"space-between"}>
      <HStack>
        {users.map((user) => (<UserInfo user={user} />))}
      </HStack>
      <HStack>
        {difficulty.map((d) => <DifficultyBadge key={d} difficulty={d} />)}
        {topic.map((t) => <TopicBadge key={t} topic={t} />)}
      </HStack>
    </HStack >
  );
};

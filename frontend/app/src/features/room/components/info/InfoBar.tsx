import { HStack } from "@chakra-ui/react";
import { DifficultyBadge, TopicBadge } from "@/features/room";
import { DifficultyType } from "@/constants/question";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { useAuth } from "@/hooks";

interface InfoBarProps {
  difficulty: DifficultyType;
  topic: string;
}

export const InfoBar = ({ difficulty, topic }: InfoBarProps) => {

  const currentUser = useAuth().data?.user;

  return (
    <HStack justifyContent={"space-between"}>
      <HStack>
        <UserInfo user={currentUser} />
        <UserInfo user={undefined} />
      </HStack>
      <HStack>
        <DifficultyBadge difficulty={difficulty} />
        <TopicBadge topic={topic} />
      </HStack>
    </HStack>
  );
};

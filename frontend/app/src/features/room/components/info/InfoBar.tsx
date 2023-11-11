import { HStack } from "@chakra-ui/react";
import { DifficultyBadge, TopicBadge } from "@/features/room";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { RoomUserInfo } from "./RoomUserInfo";
import { CustomButton } from "@/components";
import { useState } from "react";

interface InfoBarProps {
  difficulty: DifficultyType[];
  topic: TopicTagType[];
  users: { id: number; connected: boolean }[];
  showCopyLink: boolean;
  copyLinkCallback: () => void;
}

export const InfoBar = ({
  difficulty,
  topic,
  users,
  showCopyLink,
  copyLinkCallback,
}: InfoBarProps) => {
  const [copied, setCopied] = useState(false);

  const showCopied = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <HStack justifyContent="space-between" gap={8}>
      <HStack>
        {difficulty.map(d => (
          <DifficultyBadge key={d} difficulty={d} />
        ))}
        {topic.map(t => (
          <TopicBadge key={t} topic={t} />
        ))}
      </HStack>
      <HStack gap={4}>
        {users.map(user => (
          <RoomUserInfo key={user.id} user={user} />
        ))}
        {showCopyLink && (
          <CustomButton
            isDisabled={copied}
            onClick={() => {
              copyLinkCallback();
              showCopied();
            }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </CustomButton>
        )}
      </HStack>
    </HStack>
  );
};

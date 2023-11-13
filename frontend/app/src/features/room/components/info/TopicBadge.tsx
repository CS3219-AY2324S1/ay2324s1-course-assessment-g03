import { Tag } from "@chakra-ui/react";

interface TopicBadgeProps {
  topic: string;
}

export const TopicBadge = ({ topic }: TopicBadgeProps) => {
  return <Tag>{topic}</Tag>;
};

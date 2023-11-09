import { Tag } from "@chakra-ui/react";

interface TopicBadgeProps {
  topic: string;
}

export const TopicBadge = ({ topic }: TopicBadgeProps) => {
  return (
    <Tag
      fontWeight="bold"
      borderRadius="full"
      px={3}
      py={1}
      textTransform="capitalize"
    >
      {topic}
    </Tag>
  );
};

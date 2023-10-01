import { Card } from "@/components";
import { User } from "@/types/user";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { SkeletonUserCard } from "./SkeletonUserCard";

type UserCardProps = {
  user: User | undefined;
};

export const UserCard = ({ user }: UserCardProps) => {
  if (!user) {
    return <SkeletonUserCard />;
  }

  return (
    <Card w="full">
      <HStack gap="0.75rem">
        <Avatar name={user?.name} src={user?.avatarUrl} />
        <VStack alignItems="start" gap="0">
          <Text textStyle="heading-xs">{user?.name}</Text>
          <Text textStyle="text-sm">{user?.email}</Text>
        </VStack>
      </HStack>
    </Card>
  );
};

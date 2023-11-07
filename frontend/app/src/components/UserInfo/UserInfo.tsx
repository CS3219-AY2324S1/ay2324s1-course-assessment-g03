import { User } from "@/types/user";
import { Avatar, Text, HStack, VStack } from "@chakra-ui/react";
import { SkeletonUserInfo } from "./SkeletonUserInfo";

type UserInfoProps = {
  user: User | undefined;
};

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return <SkeletonUserInfo />;
  }

  return (
    <HStack gap="0.75rem">
      <Avatar name={user?.name} src={user?.avatarUrl} />
      <VStack alignItems="start" gap="0.2rem">
        <Text textStyle="heading-sm">{user?.name}</Text>
        <Text textStyle="text-sm">{user?.email}</Text>
      </VStack>
    </HStack>
  );
};

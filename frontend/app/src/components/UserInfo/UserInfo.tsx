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
    <HStack gap={4}>
      <Avatar name={user?.name} src={user?.avatarUrl} />
      <VStack alignItems="start" spacing={0}>
        {user.name && (
          <Text fontWeight="medium" fontSize="sm">
            {user.name}
          </Text>
        )}
        {user.email && <Text fontSize="sm">{user.email}</Text>}
      </VStack>
    </HStack>
  );
};

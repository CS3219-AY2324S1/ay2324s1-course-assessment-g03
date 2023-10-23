import { User } from "@/types/user";
import { Avatar, Text, HStack, VStack } from "@chakra-ui/react";
import { SkeletonUserInfo } from "./SkeletonUserInfo";

type UserInfoProps = {
  user: User | undefined;
  connected?: boolean;
};

export const UserInfo = ({ user, connected }: UserInfoProps) => {
  if (!user) {
    return <SkeletonUserInfo />;
  }

  return (
    <HStack gap="0.75rem">
      <Avatar name={user?.name} src={user?.avatarUrl} />
      <VStack alignItems="start" gap="0">
        <Text textStyle="heading-xs">{user?.name}</Text>
        {connected !== undefined ? <Text textStyle="text-sm">{user?.email}</Text> : <Text>{connected ? "Online" : "Offline"}</Text>}
      </VStack>
    </HStack>
  );
};

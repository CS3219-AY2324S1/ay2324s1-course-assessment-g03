import { useGetUserInfo } from "../../api/useGetUserInfo";
import { Text, Spinner, Avatar, HStack, VStack } from "@chakra-ui/react";

interface RoomUserInfoProps {
  user: {
    id: number;
    connected: boolean;
  };
}

export const RoomUserInfo = ({ user }: RoomUserInfoProps) => {
  const { id } = user;

  const { isLoading, isError, data } = useGetUserInfo(id);

  if (isLoading) return <Spinner />;

  if (isError || !data) return <Text>Errored</Text>;

  const { name, avatarUrl, email } = data.data.user;

  return (
    <HStack gap={2}>
      <Avatar name={name} src={avatarUrl} size="sm" />
      <VStack alignItems="start" spacing={0}>
        <Text fontSize="sm">{name ?? email}</Text>
      </VStack>
    </HStack>
  );
};

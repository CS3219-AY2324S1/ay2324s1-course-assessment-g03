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
    <HStack gap={4}>
      <Avatar name={name} src={avatarUrl} />
      <VStack alignItems="start" spacing={0}>
        <Text fontWeight="medium" fontSize="sm">
          {name ?? email}
        </Text>
      </VStack>
    </HStack>
  );
};

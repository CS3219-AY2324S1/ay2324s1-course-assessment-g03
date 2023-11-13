import { User } from "@/types/user";
import { Avatar, HStack, Text } from "@chakra-ui/react";

interface UserMessageProps {
  message: string;
  sender: User;
  isUser: boolean;
}

export const UserMessage = ({
  message,
  sender,
  isUser,
}: UserMessageProps): JSX.Element => {
  const { avatarUrl, name } = sender;

  const MyMessage = () => {
    return (
      <HStack justifyContent="flex-end">
        <Text px={2} py={1} borderRadius={6} backgroundColor="primary.600">
          {message}
        </Text>
        <Avatar name={name} src={avatarUrl} size="md" />
      </HStack>
    );
  };

  const OtherMessage = () => {
    return (
      <HStack>
        <Avatar name={name} src={avatarUrl} size="md" />
        <Text px={2} py={1} borderRadius={6} backgroundColor={"dark.800"}>
          {message}
        </Text>
      </HStack>
    );
  };

  return isUser ? <MyMessage /> : <OtherMessage />;
};

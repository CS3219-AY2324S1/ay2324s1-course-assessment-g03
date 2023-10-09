import { Card } from "@/components";
import { VStack, Text, Button, HStack } from "@chakra-ui/react";
import { UserCard } from ".";
import { useAuth } from "@/hooks";

type Props = {
  leaveCallback: () => void;
};

export const FindingMatchCard = ({ leaveCallback }: Props) => {
  const { data } = useAuth();

  const user = data?.user;

  return (
    <Card w="34rem">
      <VStack gap="1.25rem">
        <Text textStyle="heading-xs" alignSelf="start">
          Finding a match...
        </Text>
        <HStack gap="1.25rem" w="full">
          <UserCard user={user} />
          <UserCard user={undefined} />
        </HStack>
        <HStack alignSelf="end">
          <Button colorScheme="light" onClick={leaveCallback}>
            Leave room
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

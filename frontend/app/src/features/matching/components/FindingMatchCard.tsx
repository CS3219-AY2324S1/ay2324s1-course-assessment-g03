import { Card } from "@/components";
import { VStack, Text, HStack } from "@chakra-ui/react";
import { UserCard } from ".";
import { useAuth } from "@/hooks";
import { CustomButton } from "@/components/Layout/CustomButton";

type Props = {
  leaveCallback: () => void;
};

export const FindingMatchCard = ({ leaveCallback }: Props) => {
  const { data } = useAuth();

  const user = data?.user;

  return (
    <Card
      backgroundColor="light.600"
      borderRadius="1.2rem"
      padding="2rem"
      w="full"
      maxW="36rem"
    >
      <VStack gap="1.25rem">
        <Text textStyle="heading-xs" alignSelf="start">
          Finding a match...
        </Text>
        <HStack gap="1.25rem" w="full">
          <UserCard user={user} />
          <UserCard user={undefined} />
        </HStack>
        <HStack alignSelf="end">
          <CustomButton onClick={leaveCallback}>Leave room</CustomButton>
        </HStack>
      </VStack>
    </Card>
  );
};

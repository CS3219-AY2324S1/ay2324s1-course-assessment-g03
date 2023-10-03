import { Card } from "@/components";
import { VStack, Text, Button, HStack } from "@chakra-ui/react";
import { UserCard } from ".";
import { useAuth } from "@/hooks";
import { SkeletonUserCard } from "./SkeletonUserCard";

export const FindingMatchCard = () => {
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
          <SkeletonUserCard />
        </HStack>
        <HStack alignSelf="end">
          <Button colorScheme="light">Leave room</Button>
        </HStack>
      </VStack>
    </Card>
  );
};

import { useEffect, useState } from "react";
import { Button, VStack, Text, HStack } from "@chakra-ui/react";
import { UserCard } from ".";
import { Card } from "@/components";
import { useAuth } from "@/hooks";
import { User } from "@/types/user";
import { useStopwatch } from "react-timer-hook";

type Props = {
  otherUser: User | undefined;
  leaveCallback: () => void;
};

const TIMEOUT_DURATION = 3;

export const FindingMatchCard = ({ otherUser, leaveCallback }: Props) => {
  const { data } = useAuth();
  const [expired, setExpired] = useState(false);

  const { seconds, minutes } = useStopwatch({ autoStart: true });
  const [timeToJoin, setTimeToJoin] = useState(5);

  const user = data?.user;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setExpired(true);
      setTimeout(() => {
        leaveCallback();
      }, 3000);
    }, TIMEOUT_DURATION * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    if (!otherUser || timeToJoin <= 0) return;

    const timerId = setTimeout(() => {
      setTimeToJoin(timeToJoin - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [otherUser, timeToJoin]);

  const headerText = (): string => {
    if (otherUser) {
      return "Match found, joining in";
    }
    if (expired) {
      return "No match found, try again later!";
    }
    return "Finding a match";
  };

  return (
    <Card w="full" maxW="36rem">
      <VStack gap="1.25rem">
        <HStack w="full" justify="space-between">
          <Text textStyle="heading-md">{headerText()}</Text>
          <Text textStyle="heading-md">
            {otherUser ? (
              <span>{timeToJoin}</span>
            ) : (
              <>
                <span>{minutes}:</span>
                <span>{seconds}</span>
              </>
            )}
          </Text>
        </HStack>
        <HStack gap="1.25rem" w="full">
          <UserCard user={user} />
          <UserCard user={otherUser} />
        </HStack>
        <HStack alignSelf="end">
          <Button
            colorScheme="light"
            border="1px solid"
            borderRadius="6.25rem"
            borderColor="light.400"
            _hover={{
              borderColor: "light.300",
            }}
            onClick={leaveCallback}
          >
            Leave room
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

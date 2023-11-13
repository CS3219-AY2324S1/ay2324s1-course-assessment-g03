import { CustomModal, Page } from "@/components";
import { JoinRoomCard, CreateRoomCard } from "@/features/matching";
import { useCreateRoom } from "@/features/matching/api/useCreateRoom";
import { useAuth } from "@/hooks";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  HStack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { data } = useAuth();
  const user = data?.user;
  const roomId = user?.roomId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { mutate } = useCreateRoom();

  const handleCreateRoom = () => {
    if (roomId) {
      onOpen();
      return;
    }
    mutate();
  };

  const joinCallback = (route: string) => {
    if (roomId) {
      onOpen();
      return;
    }
    navigate(route);
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Session in Progress"
        description="Please end your current session before starting a new one."
      />
      <Page
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        {roomId && (
          <Alert
            bg="transparent"
            border="1px"
            borderColor="primary.500"
            borderRadius="full"
            color="dark.100"
            gap={4}
            py={4}
            px={8}
            w="xl"
          >
            <AlertIcon color="primary.500" />
            <VStack alignItems="start" spacing={0}>
              <AlertTitle fontWeight="medium">
                You have an existing session!
              </AlertTitle>
              <AlertDescription fontSize="sm">
                End the previous session before creating a new one.
              </AlertDescription>
            </VStack>
          </Alert>
        )}
        <HStack gap={8} w="xl">
          <CreateRoomCard user={user} createCallback={handleCreateRoom} />
          <JoinRoomCard user={user} joinCallback={joinCallback} />
        </HStack>
      </Page>
    </>
  );
}

export default HomePage;

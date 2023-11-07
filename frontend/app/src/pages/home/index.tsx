import { CustomModal, Page } from "@/components";
import { JoinRoomCard, CreateRoomCard } from "@/features/matching";
import { useCreateRoom } from "@/features/matching/api/useCreateRoom";
import { useAuth } from "@/hooks";
import { HStack, useDisclosure } from "@chakra-ui/react";
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
        description="You have a session in progress. End it before starting a new one."
      ></CustomModal>
      <Page display="grid" placeItems="center">
        <HStack gap="2rem" w="xl">
          <CreateRoomCard user={user} createCallback={handleCreateRoom} />
          <JoinRoomCard user={user} joinCallback={joinCallback} />
        </HStack>
      </Page>
    </>
  );
}

export default HomePage;

import { CustomModal, Page } from "@/components";
import { JoinRoomCard, CreateRoomCard } from "@/features/matching";
import { useAuth } from "@/hooks";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { data } = useAuth();
  const roomId = data?.user?.roomId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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
        <HStack gap="2rem" maxW="2xl">
          <CreateRoomCard createCallback={joinCallback} />
          <JoinRoomCard joinCallback={joinCallback} />
        </HStack>
      </Page>
    </>
  );
}

export default HomePage;

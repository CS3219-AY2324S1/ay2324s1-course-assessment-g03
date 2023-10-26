import { Page } from "@/components";
import { JoinRoomCard, CreateRoomCard } from "@/features/matching";
import { useCreateRoom } from "@/features/matching/api/useCreateRoom";
import { useAuth } from "@/hooks";
import { HStack } from "@chakra-ui/react";

function HomePage() {
  const { data } = useAuth();
  const user = data?.user;

  const { mutate } = useCreateRoom();

  const handleCreateRoom = () => {
    mutate();
  };

  return (
    <Page display="grid" placeItems="center">
      <HStack gap="2rem" w="xl">
        <CreateRoomCard user={user} createRoomCallback={handleCreateRoom} />
        <JoinRoomCard user={user} />
      </HStack>
    </Page>
  );
}

export default HomePage;

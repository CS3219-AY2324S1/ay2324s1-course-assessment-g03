import { Page } from "@/components";
import { JoinRoomCard, CreateRoomCard } from "@/features/matching";
import { HStack } from "@chakra-ui/react";

function HomePage() {
  return (
    <Page display="grid" placeItems="center">
      <HStack gap="2rem" maxW="2xl">
        <CreateRoomCard />
        <JoinRoomCard />
      </HStack>
    </Page>
  );
}

export default HomePage;

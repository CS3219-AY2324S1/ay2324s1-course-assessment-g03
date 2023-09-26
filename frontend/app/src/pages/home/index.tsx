import { Page } from "@/components";
import { JoinRoomCard, CreateRoomCard } from "@/features/matching";
import { HStack } from "@chakra-ui/react";

function HomePage() {
  return (
    <Page display="grid" placeItems="center">
      <HStack gap="1.25rem">
        <CreateRoomCard />
        <JoinRoomCard />
      </HStack>
    </Page>
  );
}

export default HomePage;

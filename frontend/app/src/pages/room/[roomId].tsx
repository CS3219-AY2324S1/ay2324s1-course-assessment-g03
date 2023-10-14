import { Page } from "@/components";
import { ROUTE } from "@/constants/route";
import { Collaborator, InfoBar } from "@/features/room";
import { VStack } from "@chakra-ui/react";
import { useParams, Navigate } from "react-router-dom";

function RoomPage() {
  const { roomId } = useParams();

  // TODO: Add Error message if room id not passed as prop
  return (
    <Page display="grid" placeItems="center">
      <VStack
        marginBottom="4"
        flexDirection="column"
        align="left"
        height="full"
        width="full"
      >
        <InfoBar difficulty={"Easy"} topic={"Data Structures & Algorithms"} />
        {roomId ? (
          <Collaborator roomId={roomId} />
        ) : (
          <Navigate to={ROUTE.ROOT} />
        )}
      </VStack>
    </Page>
  );
}

export default RoomPage;

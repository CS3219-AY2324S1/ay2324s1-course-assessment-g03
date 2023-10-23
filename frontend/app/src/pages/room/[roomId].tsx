import { Page } from "@/components";
import { ROUTE } from "@/constants/route";
import { Collaborator, InfoBar } from "@/features/room";
import { Spinner, VStack, Text } from "@chakra-ui/react";
import { useParams, Navigate } from "react-router-dom";
import { useGetRoomInfo } from "@/features/room/api/useGetRoomInfo";
import { API_RESPONSE_STATUS } from "@/constants/api";

function RoomPage() {

  const { roomId } = useParams();

  const { isLoading, isError, data } = useGetRoomInfo(roomId ?? "")

  if (isLoading) return (<Spinner />)

  // TODO: Proper error response
  if (isError || !data || data.status !== API_RESPONSE_STATUS.SUCCESS) return (<Text>Errored</Text>)

  const { difficulty, users, questionId, topic, language } = data.data

  return (
    <Page display="grid" placeItems="center">
      <VStack
        marginBottom="4"
        flexDirection="column"
        align="left"
        height="full"
        width="full"
      >
        <InfoBar difficulty={difficulty} topic={topic} users={users} />
        {roomId ? (
          <Collaborator roomId={roomId} difficulty={difficulty} topic={topic} questionId={questionId} language={language} />
        ) : (
          <Navigate to={ROUTE.ROOT} />
        )}
      </VStack>
    </Page>
  );
}

export default RoomPage;

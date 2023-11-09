import { Page } from "@/components";
import { ROUTE } from "@/constants/route";
import { Collaborator } from "@/features/room";
import { Spinner, Text } from "@chakra-ui/react";
import { useParams, Navigate } from "react-router-dom";
import { useGetRoomInfo } from "@/features/room/api/useGetRoomInfo";
import { API_RESPONSE_STATUS } from "@/constants/api";

function RoomPage() {
  const { roomId } = useParams();

  const { isLoading, isError, data } = useGetRoomInfo(roomId);

  if (isLoading) return <Spinner />;

  // TODO: Proper error response
  if (isError || !data || data.status !== API_RESPONSE_STATUS.SUCCESS)
    return <Text>Errored</Text>;

  const { difficulty, users, questionId, topic, language } = data.data;

  return (
    <Page display="grid" placeItems="top" height="full">
      {roomId ? (
        <Collaborator
          roomId={roomId}
          difficulty={difficulty}
          topic={topic}
          questionId={questionId}
          language={language}
          users={users}
        />
      ) : (
        <Navigate to={ROUTE.ROOT} />
      )}
    </Page>
  );
}

export default RoomPage;

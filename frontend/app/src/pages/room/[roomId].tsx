import { Page } from "@/components";
import { ROUTE } from "@/constants/route";
import { Collaborator, InfoBar } from "@/features/room";
import { Spinner, VStack, Text } from "@chakra-ui/react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { useGetRoomInfo } from "@/features/room/api/useGetRoomInfo";
import { API_RESPONSE_STATUS, WEBSOCKET_PATH } from "@/constants/api";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { env } from "@/lib/env";
import { useAuth } from "@/hooks";

function RoomPage() {
  const location = useLocation();
  // Check if  user came from create room
  const cameFromCreate = location.state?.fromCreate;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const [socket, setSocket] = useState<Socket | null>(null);
  const { roomId } = useParams();

  const { isLoading, isError, data } = useGetRoomInfo(roomId);

  const id = useAuth().data?.user?.id;

  useEffect(() => {
    const connectSocket = io(`${env.VITE_BACKEND_URL}`, {
      path: WEBSOCKET_PATH.COLLABORATION,
      withCredentials: true,
      query: {
        roomId: roomId,
        userId: id,
      },
    });
    setSocket(connectSocket);
    return () => {
      if (connectSocket) {
        connectSocket.disconnect();
        setSocket(null);
      }
    };
  }, [roomId, id]);

  if (isLoading || !socket) return <Spinner />;

  if (isError || !data || data.status !== API_RESPONSE_STATUS.SUCCESS)
    return <Text>Errored</Text>;

  const { difficulty, users, questionId, topic, language } = data.data;

  return (
    <Page display="grid" placeItems="center">
      <VStack
        marginBottom="4"
        flexDirection="column"
        align="left"
        height="full"
        width="full"
      >
        <InfoBar
          showCopyLink={cameFromCreate}
          copyLinkCallback={copyToClipboard}
          difficulty={difficulty}
          topic={topic}
          users={users}
        />
        {roomId ? (
          <Collaborator
            roomId={roomId}
            difficulty={difficulty}
            topic={topic}
            questionId={questionId}
            language={language}
            users={users}
            socket={socket}
          />
        ) : (
          <Navigate to={ROUTE.ROOT} />
        )}
      </VStack>
    </Page>
  );
}

export default RoomPage;

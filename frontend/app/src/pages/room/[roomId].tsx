import { CustomAlert, Page } from "@/components";
import { ROUTE } from "@/constants/route";
import { Collaborator } from "@/features/room";
import { Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useParams, Navigate } from "react-router-dom";
import { useGetRoomInfo } from "@/features/room/api/useGetRoomInfo";
import { API_RESPONSE_STATUS } from "@/constants/api";
import { useAuth } from "@/hooks";
import { useRef } from "react";
import { useGetGithubAuthUrl } from "@/features/auth/api";

function RoomPage() {
  const user = useAuth().data?.user;
  const { onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { refetch: loginWithGithub } = useGetGithubAuthUrl();
  const { roomId } = useParams();
  const { isLoading, isError, data } = useGetRoomInfo(roomId);

  if (!user) {
    return (
      <CustomAlert
        title="Not logged in"
        description="You have to login to view this page!"
        confirmButtonText="Login"
        disableCancel={true}
        isOpen={true}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        onConfirm={() => loginWithGithub()}
      />
    );
  }

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
          //@ts-expect-error TODO: Fix typing (userId `string` or `number`)
          users={users}
        />
      ) : (
        <Navigate to={ROUTE.ROOT} />
      )}
    </Page>
  );
}

export default RoomPage;

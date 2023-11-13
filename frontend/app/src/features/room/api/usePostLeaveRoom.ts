import { backendApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/constants/route";

const postLeaveRoomResponseSchema = makeSuccessResponseSchema(
  z.object({
    roomId: z.string(),
    userId: z.string(),
  }),
);

const postLeaveRoom = async (
  roomId: string | undefined,
  userId: User["id"] | undefined,
) => {
  if (!userId) {
    console.error("User ID is missing");
    return;
  }
  if (!roomId) {
    console.error("Room Id is missing");
    return;
  }
  const communicationDeleteResponse = await backendApi.delete(
    `${API_ENDPOINT.COMMUNICATION_ROOM}/${roomId}/user/${userId}`,
  );
  if (communicationDeleteResponse.data.status !== "success") {
    return postLeaveRoomResponseSchema.parse(communicationDeleteResponse.data);
  }

  const collaborationDeleteResponse = await backendApi.delete(
    `${API_ENDPOINT.COLLABORATION_ROOM}/${roomId}/user/${userId}`,
  );
  return postLeaveRoomResponseSchema.parse(collaborationDeleteResponse.data);
};

export const usePostLeaveRoom = () => {
  const toast = useToast();
  const { data } = useAuth();
  const navigate = useNavigate();

  const userId = data?.user?.id;
  const roomId = data?.user?.roomId;

  return useMutation(() => postLeaveRoom(roomId, userId), {
    onSuccess: () => {
      navigate(ROUTE.HOME);
      toast({
        status: "success",
        title: "You have left the room.",
        isClosable: true,
      });
    },
  });
};

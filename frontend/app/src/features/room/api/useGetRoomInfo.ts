import { API_ENDPOINT } from "@/constants/api";
import { LANGUAGE_KEYS } from "@/constants/language";
import { DIFFICULTY } from "@/constants/question";
import { useAuth } from "@/hooks";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const GET_ROOM_INFO_KEY = "get-room-info";

const getRoomInfoResponseSchema = makeSuccessResponseSchema(
  z.object({
    difficulty: z.array(z.nativeEnum(DIFFICULTY)),
    topic: z.array(z.string()),
    users: z.array(
      z.object({
        connected: z.boolean(),
        id: z.string(),
      }),
    ),
    questionId: z.number().optional(),
    language: z.nativeEnum(LANGUAGE_KEYS),
  }),
);

const getRoomInfo = async (roomId: string) => {
  const { data } = await backendApi.get(
    `${API_ENDPOINT.COLLABORATION_ROOM}/${roomId}`,
  );
  return getRoomInfoResponseSchema.parse(data);
};

export const useGetRoomInfo = (roomId: string | undefined) => {
  const user = useAuth().data?.user;

  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [GET_ROOM_INFO_KEY, roomId],
    queryFn: roomId ? () => getRoomInfo(roomId) : undefined,
    enabled: roomId !== undefined && user !== undefined,
    retry: false,
    onSuccess() {
      setTimeout(() => {
        queryClient.invalidateQueries([GET_ROOM_INFO_KEY, roomId]);
      }, 5000);
    },
  });
};

import { backendApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/constants/route";

const createRoomResponseSchema = makeSuccessResponseSchema(
  z.object({
    created: z.string(),
    roomId: z.string(),
  }),
);

const createRoom = async () => {
  const { data } = await backendApi.post(`${API_ENDPOINT.COLLABORATION_ROOM}`, {
    difficulty: [],
    topic: [],
  });
  const parsed = createRoomResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Unexpected response shape:", parsed.error);
    return data;
  }
  return parsed.data;
};

export const useCreateRoom = () => {
  const navigate = useNavigate();

  return useMutation(() => createRoom(), {
    onSuccess: data => {
      navigate(`${ROUTE.ROOM}/${data.data.roomId}`, {
        state: { fromCreate: true },
      });
    },
  });
};

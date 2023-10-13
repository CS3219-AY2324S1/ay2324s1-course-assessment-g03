import { backendApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";
import { GET_AUTH_QUERY_KEY, useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/constants/route";

const deleteUserResponseSchema = makeSuccessResponseSchema(
  z.object({
    message: z.string(),
  }),
);

const deleteUser = async (userId: User["id"] | undefined) => {
  if (!userId) {
    console.error("User ID is missing");
    return;
  }
  const { data } = await backendApi.delete(
    `${API_ENDPOINT.USERS}/id/${userId}`,
  );
  const parsed = deleteUserResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Unexpected response shape:", parsed.error);
    return data;
  }
  return parsed.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const { data } = useAuth();

  const userId = data?.user?.id;

  return useMutation(() => deleteUser(userId), {
    onSuccess: () => {
      toast({
        status: "success",
        title: "You have successfully deleted your profile",
        isClosable: true,
      });
      queryClient.setQueryData(GET_AUTH_QUERY_KEY, undefined);
      navigate(ROUTE.ROOT);
    },
  });
};

import { backendApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_AUTH_QUERY_KEY, useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/constants/route";
import { safeParse } from "@/lib/safeParse";

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
  return safeParse(deleteUserResponseSchema, data);
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
      queryClient.removeQueries([GET_AUTH_QUERY_KEY]);
      navigate(ROUTE.ROOT);
    },
  });
};

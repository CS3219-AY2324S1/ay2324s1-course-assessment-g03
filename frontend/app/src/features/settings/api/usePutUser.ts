import { backendApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_AUTH_QUERY_KEY, useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User, userSchema } from "@/types/user";
import { safeParse } from "@/lib/safeParse";

const putUserRequestSchema = z.object({
  user: userSchema.partial().omit({ id: true, name: true, role: true }),
});
type PutUserRequestType = z.infer<typeof putUserRequestSchema>;

const putUserResponseSchema = makeSuccessResponseSchema(
  z.object({
    user: userSchema,
  }),
);

const putUser = async (
  userId: User["id"] | undefined,
  body: PutUserRequestType,
) => {
  if (!userId) {
    console.error("User ID is missing");
    return;
  }
  const { data } = await backendApi.put(
    `${API_ENDPOINT.USERS}/id/${userId}`,
    body,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    },
  );
  return safeParse(putUserResponseSchema, data);
};

export const usePutUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data } = useAuth();

  const userId = data?.user?.id;

  return useMutation((body: PutUserRequestType) => putUser(userId, body), {
    onSuccess: () => {
      toast({
        status: "success",
        title: "You have successfully updated your profile",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: [GET_AUTH_QUERY_KEY] });
    },
  });
};

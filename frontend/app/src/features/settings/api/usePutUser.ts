import { backendApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";
import { GET_AUTH_QUERY_KEY, useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";

const putUserRequestSchema = z.object({
  name: z.string().optional(),
});
type PutUserRequestType = z.infer<typeof putUserRequestSchema>;

const putUserResponseSchema = makeSuccessResponseSchema(
  z.object({
    message: z.string(),
  }),
);

const putUser = async (userId: User["id"], body: PutUserRequestType) => {
  const { data } = await backendApi.put(
    `${API_ENDPOINT.USERS}/${userId}`,
    body,
  );
  return putUserResponseSchema.parse(data);
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
      queryClient.invalidateQueries(GET_AUTH_QUERY_KEY);
    },
  });
};

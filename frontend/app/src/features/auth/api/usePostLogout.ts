import { backendApi } from "@/lib";
import { useMutation, useQueryClient } from "react-query";
import { GET_AUTH_QUERY_KEY } from "../../../hooks/useAuth";
import { useToast } from "@chakra-ui/react";

type PostLogoutRespose = {
  status: "success" | "fail";
  data: { message: string };
};

const postLogout = async () => {
  const { data } = await backendApi.post<PostLogoutRespose>(
    "/auth/logout",
    {},
    { withCredentials: true }
  );

  return data.data;
};

export const usePostLogout = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postLogout, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "You have been logged out",
      });
      queryClient.setQueryData([GET_AUTH_QUERY_KEY], undefined);
    },
  });
};

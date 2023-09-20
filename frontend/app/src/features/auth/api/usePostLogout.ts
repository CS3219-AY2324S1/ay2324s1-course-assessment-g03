import { backendApi } from "@/lib";
import { useMutation, useQueryClient } from "react-query";
import { GET_AUTH_QUERY_KEY } from "../../../hooks/useAuth";

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

  return useMutation(postLogout, {
    onSuccess: () => {
      queryClient.setQueryData([GET_AUTH_QUERY_KEY], undefined);
    },
  });
};

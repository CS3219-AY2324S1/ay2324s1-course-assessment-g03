import { API_ENDPOINT } from "@/constants/api";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { userSchema } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const GET_USER_INFO_KEY = "get-user-info";

const getUserInfoSchema = makeSuccessResponseSchema(
  z.object({ user: userSchema }),
);

const getUserInfo = async (id: number) => {
  const { data } = await backendApi.get(`${API_ENDPOINT.USERS}/id/${id}`);
  return getUserInfoSchema.parse(data);
};

export const useGetUserInfo = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [GET_USER_INFO_KEY, id],
    queryFn: () => getUserInfo(id),
    enabled: !!id,
    retry: false,
    onSuccess() {
      setTimeout(() => {
        queryClient.invalidateQueries([GET_USER_INFO_KEY]);
      }, 10000);
    },
  });
};

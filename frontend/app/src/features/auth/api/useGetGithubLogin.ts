import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { API_ENDPOINT } from "@/constants/api";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/constants/route";
import { GET_AUTH_QUERY_KEY } from "@/hooks";

const GET_GITHUB_LOGIN_KEY = "github-login";

const getGithubLoginResponseSchema = makeSuccessResponseSchema(
  z.object({
    message: z.string(),
  }),
);

const getGithubLogin = async (params: URLSearchParams) => {
  const { data } = await backendApi.get(API_ENDPOINT.AUTH_GITHUB_LOGIN, {
    params,
  });
  return getGithubLoginResponseSchema.parse(data);
};

export const useGetGithubLogin = (params: URLSearchParams) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useQuery({
    queryKey: [GET_GITHUB_LOGIN_KEY],
    queryFn: () => getGithubLogin(params),
    enabled: !!params,
    retry: false,
    onSuccess() {
      queryClient.invalidateQueries([GET_AUTH_QUERY_KEY]);
      navigate(ROUTE.HOME);
    },
  });
};

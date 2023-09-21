import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import { useQuery } from "react-query";
import { z } from "zod";

const GET_GITHUB_LOGIN_KEY = "github-login";

const getGithubLoginResponseSchema = makeSuccessResponseSchema(
  z.object({
    message: z.string(),
  }),
);

const getGithubLogin = async (params: URLSearchParams) => {
  const { data } = await backendApi.get(`/auth/github/login`, { params });
  return getGithubLoginResponseSchema.parse(data);
};

export const useGetGithubLogin = (params: URLSearchParams) => {
  return useQuery({
    queryKey: [GET_GITHUB_LOGIN_KEY],
    queryFn: () => getGithubLogin(params),
    enabled: !!params,
    retry: false,
    onSuccess() {
      //   window.location.href = "/";
    },
  });
};

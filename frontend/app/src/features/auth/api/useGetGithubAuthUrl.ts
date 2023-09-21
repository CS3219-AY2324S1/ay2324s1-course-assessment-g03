import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import { useQuery } from "react-query";
import { z } from "zod";

const GET_GITHUB_AUTH_URL_KEY = "github-auth-url";

const getGithubAuthUrlResponseSchema = makeSuccessResponseSchema(
  z.object({
    url: z.string().url(),
  }),
);

const getGithubAuthUrl = async () => {
  const { data } = await backendApi.get("/auth/github/authorize");
  return getGithubAuthUrlResponseSchema.parse(data);
};

export const useGetGithubAuthUrl = () => {
  return useQuery({
    queryKey: [GET_GITHUB_AUTH_URL_KEY],
    queryFn: () => getGithubAuthUrl(),
    enabled: false,
    retry: false,
    onSuccess({ data }) {
      window.location.href = data.url;
    },
  });
};

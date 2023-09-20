import { backendApi } from "@/lib";
import { useQuery } from "react-query";

const GET_GITHUB_AUTH_URL_KEY = "github-auth-url";

type GetGithubAuthUrlResponse =
  | {
      status: "success";
      data: {
        url: string;
      };
    }
  | {
      status: "fail";
      message: string;
    };

const getGithubAuthUrl = async () => {
  try {
    const { data } = await backendApi.get<GetGithubAuthUrlResponse>(
      "/auth/github/authorize",
    );
    if (data.status === "fail") {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const useGetGithubAuthUrl = () => {
  return useQuery({
    queryKey: [GET_GITHUB_AUTH_URL_KEY],
    queryFn: getGithubAuthUrl,
    enabled: false,
    retry: false,
    onSuccess(data) {
      window.location.href = data.url;
    },
  });
};

import { backendApi } from "@/lib";
import { User } from "@/types/user";
import { useQuery } from "react-query";

export const GET_AUTH_QUERY_KEY = "auth";

type GetAuthResponse =
  | {
      status: "success";
      data: {
        user: User;
      };
    }
  | {
      status: "fail";
      data: {
        message: string;
      };
    };

const getAuth = async () => {
  try {
    const { data } = await backendApi.get<GetAuthResponse>("/auth", {
      withCredentials: true,
    });
    if (data.status === "fail") {
      throw new Error(data.data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const useAuth = () => {
  return useQuery({
    queryKey: [GET_AUTH_QUERY_KEY],
    queryFn: getAuth,
  });
};

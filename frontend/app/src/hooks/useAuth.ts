import { API_ENDPOINT } from "@/constants/api";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { userSchema } from "@/types/user";
import { useQuery } from "react-query";
import { z } from "zod";

export const GET_AUTH_QUERY_KEY = "auth";

const getAuthResponseSchema = makeSuccessResponseSchema(
  z.object({
    user: userSchema,
  }),
);

const getAuth = async () => {
  const { data } = await backendApi.get(API_ENDPOINT.AUTH);
  const parsedResponse = getAuthResponseSchema.safeParse(data);

  // Fail silently
  if (parsedResponse.success) {
    return { ...parsedResponse.data.data };
  }
};

export const useAuth = () => {
  return useQuery({
    queryKey: [GET_AUTH_QUERY_KEY],
    queryFn: () => getAuth(),
    retry: false,
  });
};

import { API_ENDPOINT } from "@/constants/api";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { submissionSchema } from "@/types/submission";
import { userSchema } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const GET_AUTH_QUERY_KEY = "auth";

const getAuthResponseSchema = makeSuccessResponseSchema(
  z.object({
    user: userSchema.extend({
      roomId: z.string().optional(),
      submissions: z.array(submissionSchema),
    }),
  }),
);

const getAuth = async () => {
  const { data } = await backendApi.get(API_ENDPOINT.AUTH);
  const parsedResponse = getAuthResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    throw new Error(parsedResponse.error.message);
  }

  return { ...parsedResponse.data.data };
};

type UseAuthOptions = {
  redirectToIfNotAuthenticated?: string;
};

export const useAuth = (options?: UseAuthOptions) => {
  const { redirectToIfNotAuthenticated } = options ?? {};

  const navigate = useNavigate();

  return useQuery({
    queryKey: [GET_AUTH_QUERY_KEY],
    queryFn: () => getAuth(),
    retry: false,
    meta: {
      skipGlobalErrorHandler: true,
    },
    onError: () => {
      if (redirectToIfNotAuthenticated) {
        navigate(redirectToIfNotAuthenticated);
      }
    },
  });
};

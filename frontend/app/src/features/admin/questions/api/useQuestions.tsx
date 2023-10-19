import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { getQuestionsResponseSchema } from "../types";

type UseQuestionsOptions = {
  pageNum: number;
  pageSize: number;
};

const queryKey = [QUESTIONS_QUERY_KEY];

export const useQuestions = ({ pageNum, pageSize }: UseQuestionsOptions) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await backendApi.get(`${API_ENDPOINT.ADMIN_QUESTIONS}`, {
        params: {
          page: pageNum,
          limit: pageSize,
        },
      });
      return safeParse(getQuestionsResponseSchema, data);
    },
  });
};

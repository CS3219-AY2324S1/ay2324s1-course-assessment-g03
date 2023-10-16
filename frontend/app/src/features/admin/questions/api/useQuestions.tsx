import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import { questionSchema } from "@/types/question";
import { z } from "zod";
import { safeParse } from "@/lib/safeParse";

type UseQuestionsOptions = {
  pageNum: number;
  pageSize: number;
};

const getQuestionsResponseSchema = makeSuccessResponseSchema(
  z.object({
    questions: z.array(questionSchema),
    pagination: z.object({
      current_page: z.number(),
      limit: z.number(),
      order: z.string(),
      sort_by: z.string(),
      total_pages: z.number(),
      total_questions: z.number(),
    }),
  }),
);

export type GetQuestionsResponse = z.infer<typeof getQuestionsResponseSchema>;

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

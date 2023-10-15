import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import { questionSchema } from "@/types/question";
import { z } from "zod";
import { safeParse } from "@/lib/safeParse";

const getQuestionsResponseSchema = makeSuccessResponseSchema(
  z.object({
    questions: z.array(questionSchema),
  }),
);

export type GetQuestionsResponse = z.infer<typeof getQuestionsResponseSchema>;

const queryKey = [QUESTIONS_QUERY_KEY];

export const useQuestions = () => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await backendApi.get(`${API_ENDPOINT.ADMIN_QUESTIONS}`);
      return safeParse(getQuestionsResponseSchema, data);
    },
  });
};

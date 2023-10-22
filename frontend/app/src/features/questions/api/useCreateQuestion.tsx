import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateQuestionVariables,
  GetQuestionsResponse,
  PostQuestionResponse,
  postQuestionResponseSchema,
} from "../types";
import { QUESTIONS_QUERY_KEY } from "../constants";

const queryKey = [QUESTIONS_QUERY_KEY];

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newQuestion: CreateQuestionVariables) => {
      const { data } = await backendApi.post(
        `${API_ENDPOINT.ADMIN_QUESTIONS}`,
        newQuestion,
      );
      return safeParse(postQuestionResponseSchema, data);
    },
    onSuccess: (data: PostQuestionResponse) =>
      queryClient.setQueryData(
        queryKey,
        (prevData: GetQuestionsResponse | undefined) =>
          prevData
            ? {
                ...prevData,
                data: {
                  ...prevData.data,
                  questions: [data.data.question, ...prevData.data.questions],
                },
              }
            : prevData,
      ),
  });
};

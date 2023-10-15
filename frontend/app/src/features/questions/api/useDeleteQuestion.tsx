import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import { GetQuestionsResponse } from "./useQuestions";
import {
  DeleteQuestionVariables,
  deleteQuestionResponseSchema,
} from "../types";

const queryKey = [QUESTIONS_QUERY_KEY];

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId }: DeleteQuestionVariables) => {
      const { data } = await backendApi.delete(
        `${API_ENDPOINT.ADMIN_QUESTIONS}/${questionId}`,
      );
      return safeParse(deleteQuestionResponseSchema, data);
    },
    onMutate: async ({ questionId }) => {
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (prevData: GetQuestionsResponse | undefined) =>
          prevData
            ? {
                ...prevData,
                data: {
                  ...prevData.data,
                  questions: prevData.data.questions.filter(
                    question => question.id !== questionId,
                  ),
                },
              }
            : prevData,
      );

      return { prevData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKey, context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

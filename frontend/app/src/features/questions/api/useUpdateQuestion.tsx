import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import {
  GetQuestionsResponse,
  putQuestionResponseSchema,
  UpdateQuestionVariables,
} from "../types";
import { Toast } from "@/components/Toast";
import { useToast } from "@chakra-ui/react";

const queryKey = [QUESTIONS_QUERY_KEY];

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (updatedQuestion: UpdateQuestionVariables) => {
      const { data } = await backendApi.put(
        `${API_ENDPOINT.ADMIN_QUESTIONS}/${updatedQuestion.id}`,
        updatedQuestion,
      );
      return safeParse(putQuestionResponseSchema, data);
    },
    onMutate: async updatedQuestion => {
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
                  questions: prevData.data.questions.map(question =>
                    question.id === updatedQuestion.id
                      ? updatedQuestion
                      : question,
                  ),
                },
              }
            : prevData,
      );

      return { prevData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: () =>
      toast({
        render: ({ onClose }) => (
          <Toast
            status="success"
            message="Question updated successfully!"
            onClose={onClose}
          />
        ),
      }),
  });
};

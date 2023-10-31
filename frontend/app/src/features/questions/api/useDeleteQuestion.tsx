import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import {
  DeleteQuestionVariables,
  GetQuestionsResponse,
  deleteQuestionResponseSchema,
} from "../types";
import { useToast } from "@chakra-ui/react";
import { Toast } from "@/components/Toast";

const queryKey = [QUESTIONS_QUERY_KEY];

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

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
    onError: (err: Error, _vars, context) => {
      toast({
        render: ({ onClose }) => (
          <Toast
            status="error"
            message={`Error deleting question: ${err.message}`}
            onClose={onClose}
          />
        ),
      });
      queryClient.setQueryData(queryKey, context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: () =>
      toast({
        render: ({ onClose }) => (
          <Toast
            status="success"
            message="Question deleted successfully!"
            onClose={onClose}
          />
        ),
      }),
  });
};

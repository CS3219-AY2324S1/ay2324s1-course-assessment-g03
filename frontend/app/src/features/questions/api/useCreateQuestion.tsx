import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { useMutation } from "@tanstack/react-query";
import { CreateQuestionVariables, postQuestionResponseSchema } from "../types";
import { useToast } from "@chakra-ui/react";
import { useQuestions } from "../components/QuestionsOutlet";
import { Toast } from "@/components/Toast";

export const useCreateQuestion = () => {
  const { refetch } = useQuestions();
  const toast = useToast();

  return useMutation({
    mutationFn: async (newQuestion: CreateQuestionVariables) => {
      const { data } = await backendApi.post(
        `${API_ENDPOINT.ADMIN_QUESTIONS}`,
        newQuestion,
      );
      return safeParse(postQuestionResponseSchema, data);
    },
    onSuccess: () => {
      refetch;
      toast({
        render: ({ onClose }) => (
          <Toast
            status="success"
            message="Question created successfully!"
            onClose={onClose}
          />
        ),
      });
    },
    onError: (err: Error) => {
      toast({
        render: ({ onClose }) => (
          <Toast
            status="error"
            message={`Error creating question: ${err.message}`}
            onClose={onClose}
          />
        ),
      });
    },
  });
};

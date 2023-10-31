import { API_ENDPOINT } from "@/constants/api";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

const GET_QUESTION_DETAILS_KEY = "get-question-details";

const getQuestionDetailsResponseSchema = makeSuccessResponseSchema(
  z.object({
    question: z.object({
      description: z.string(),
    }),
  }),
);

const getQuestionDetails = async (questionId: number) => {
  const { data } = await backendApi.get(
    `${API_ENDPOINT.QUESTIONS}/${questionId}`,
  );
  return getQuestionDetailsResponseSchema.parse(data);
};

export const useGetQuestionDetails = (questionId: number | undefined) => {
  return useQuery({
    queryKey: [GET_QUESTION_DETAILS_KEY],
    queryFn: questionId ? () => getQuestionDetails(questionId) : undefined,
    enabled: questionId !== undefined,
    retry: false,
  });
};

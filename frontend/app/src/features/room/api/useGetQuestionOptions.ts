import { API_ENDPOINT } from "@/constants/api";
import { DifficultyType } from "@/constants/question";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const GET_QUESTION_OPTIONS_KEY = "get-question-options";

const getQuestionOptionsResponseSchema = makeSuccessResponseSchema(
  z.object({
    questions: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
      }),
    ),
  }),
);

const getQuestionOptions = async (
  difficulty: DifficultyType[],
  topic: string[],
) => {
  const { data } = await backendApi.get(`${API_ENDPOINT.QUESTIONS}`, {
    params: {
      difficulty,
      topic,
    },
  });
  return getQuestionOptionsResponseSchema.parse(data);
};

export const useGetQuestionOptions = (
  difficulty: DifficultyType[],
  topic: string[],
) => {
  return useQuery({
    queryKey: [GET_QUESTION_OPTIONS_KEY],
    queryFn: () => getQuestionOptions(difficulty, topic),
    enabled: !!difficulty && !!topic,
    retry: false,
  });
};

import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { API_ENDPOINT } from "@/constants/api";
import { DIFFICULTY } from "@/constants/question";

const GET_QUESTION_FILTERS = "question-filters";

const getQuestionFiltersSchema = makeSuccessResponseSchema(
  z.object({
    [DIFFICULTY.EASY]: z.array(z.string()),
    [DIFFICULTY.MEDIUM]: z.array(z.string()),
    [DIFFICULTY.HARD]: z.array(z.string()),
  }),
);

const getQuestionFilters = async () => {
  const { data } = await backendApi.get(API_ENDPOINT.QUESTIONS_GET_FILTERS);
  return getQuestionFiltersSchema.parse(data);
};

export const useGetQuestionFilters = () => {
  return useQuery({
    queryKey: [GET_QUESTION_FILTERS],
    queryFn: () => getQuestionFilters(),
    retry: false,
  });
};

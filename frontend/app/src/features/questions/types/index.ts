import { makeSuccessResponseSchema } from "@/lib/api";
import { questionSchema } from "@/types/question";
import { z } from "zod";

export enum SortBy {
  Id = "id",
  Title = "title",
  Category = "category",
  Difficulty = "difficulty",
  Paid = "paid_only",
  Topic = "topic_tags",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

const paginationSchema = z.object({
  current_page: z.number(),
  limit: z.number(),
  order: z.string(),
  sort_by: z.string(),
  total_pages: z.number(),
  total_questions: z.number(),
});

export const getQuestionsResponseSchema = makeSuccessResponseSchema(
  z.object({
    questions: z.array(questionSchema.partial()),
    pagination: paginationSchema,
  }),
);

export type GetQuestionsResponse = z.infer<typeof getQuestionsResponseSchema>;

export const createQuestionVariablesSchema = questionSchema
  .partial()
  .omit({ id: true, code_snippets: true });

export type CreateQuestionVariables = z.infer<
  typeof createQuestionVariablesSchema
>;

export const postQuestionRequestSchema = z.object({
  question: questionSchema.omit({ id: true }),
});

export type PostQuestionRequest = z.infer<typeof putQuestionRequestSchema>;

export const postQuestionResponseSchema = makeSuccessResponseSchema(
  z.object({
    question: questionSchema.partial(),
  }),
);

export type PostQuestionResponse = z.infer<typeof postQuestionResponseSchema>;

export const updateQuestionVariablesSchema = questionSchema
  .partial()
  .required({ id: true });

export type UpdateQuestionVariables = z.infer<
  typeof updateQuestionVariablesSchema
>;

export const putQuestionRequestSchema = z.object({
  question: questionSchema.partial().omit({ id: true }),
});

export type PutQuestionRequest = z.infer<typeof putQuestionRequestSchema>;

export const putQuestionResponseSchema = makeSuccessResponseSchema(
  z.object({
    updated_id: questionSchema.pick({ id: true }),
    updated_data: putQuestionRequestSchema,
  }),
);

export const deleteQuestionVariablesSchema = z.object({
  questionId: questionSchema.shape.id,
});

export type DeleteQuestionVariables = z.infer<
  typeof deleteQuestionVariablesSchema
>;

export const deleteQuestionResponseSchema = makeSuccessResponseSchema(
  z.object({
    deleted_id: questionSchema.shape.id,
  }),
);

export enum INPUT_TYPE {
  TEXT = "text",
  SELECT = "select",
  MULTISELECT = "multiselect",
  TEXTAREA = "textarea",
}

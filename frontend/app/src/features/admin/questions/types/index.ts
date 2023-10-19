import { makeSuccessResponseSchema } from "@/lib/api";
import { questionSchema } from "@/types/question";
import { z } from "zod";

export const getQuestionsResponseSchema = makeSuccessResponseSchema(
  z.object({
    questions: z.array(questionSchema),
    pagination: z.object({
      current_page: z.number(),
      limit: z.number(),
      order: z.string(),
      sort_by: z.string(),
      total_pages: z.number(),
      total_questions: z.number(),
    }),
  }),
);

export type GetQuestionsResponse = z.infer<typeof getQuestionsResponseSchema>;

export const createQuestionVariablesSchema = questionSchema
  .partial()
  .omit({ id: true });

export type CreateQuestionVariables = z.infer<
  typeof createQuestionVariablesSchema
>;

export const postQuestionRequestSchema = z.object({
  question: questionSchema.omit({ id: true }),
});

export type PostQuestionRequest = z.infer<typeof putQuestionRequestSchema>;

export const postQuestionResponseSchema = makeSuccessResponseSchema(
  z.object({
    question: questionSchema,
  }),
);

export type PostQuestionResponse = z.infer<typeof postQuestionResponseSchema>;

export const deleteQuestionVariablesSchema = z.object({
  questionId: questionSchema.shape.id,
});

export const updateQuestionVariablesSchema = questionSchema
  .partial()
  .omit({ id: true });

export type updateQuestionVariables = z.infer<
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

export type DeleteQuestionVariables = z.infer<
  typeof deleteQuestionVariablesSchema
>;

export const deleteQuestionResponseSchema = makeSuccessResponseSchema(
  z.object({
    deleted_id: questionSchema.partial().pick({ id: true }),
  }),
);

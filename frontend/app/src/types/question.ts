import { z } from "zod";

export const questionSchema = z.object({
  id: z.number(),
  category: z.string(),
  code_snippets: z.array(
    z.object({
      lang: z.string(),
      langSlug: z.string(),
      code: z.string(),
    }),
  ),
  description: z.string(),
  difficulty: z.string(),
  hints: z.array(z.string()),
  languages: z.array(z.string()),
  paid_only: z.boolean(),
  test_cases: z.array(z.string()),
  title: z.string(),
  topic_tags: z.array(z.string()),
  updated_at: z.number(),
  url: z.string().url().or(z.literal("")),
});

export type Question = z.infer<typeof questionSchema>;

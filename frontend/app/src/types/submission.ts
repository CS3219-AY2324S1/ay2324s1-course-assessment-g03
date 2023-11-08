import { z } from "zod";

export const submissionSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  userIds: z.array(z.string()),
  code: z.string(),
  lang: z.string(),
  createdAt: z.string(),
});

export type Submission = z.infer<typeof submissionSchema>;

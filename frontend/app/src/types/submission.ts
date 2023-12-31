import { z } from "zod";
import { userSchema } from "./user";

export const submissionSchema = z.object({
  id: z.number(),
  questionId: z.string(),
  users: z.array(userSchema),
  code: z.string(),
  lang: z.string(),
  createdAt: z.string(),
});

export type Submission = z.infer<typeof submissionSchema>;

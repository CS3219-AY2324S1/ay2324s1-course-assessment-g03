import { backendApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";
import { submissionSchema } from "@/types/submission";

const postSubmissionRequestSchema = z.object({
  submission: z.object({
    otherUserId: z.string().optional(),
    questionId: z.number(),
    code: z.string(),
    lang: z.string(),
  }),
});
type PostSubmissionRequestType = z.infer<typeof postSubmissionRequestSchema>;

const postSubmissionResponseSchema = makeSuccessResponseSchema(
  z.object({
    submission: submissionSchema,
  }),
);

const postSubmission = async (
  userId: User["id"] | undefined,
  body: PostSubmissionRequestType,
) => {
  if (!userId) {
    console.error("User ID is missing when posting submission");
    return;
  }
  const { data } = await backendApi.post(
    `${API_ENDPOINT.USERS_ID}/${userId}/submissions`,
    body,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    },
  );
  return postSubmissionResponseSchema.parse(data);
};

export const usePostSubmission = () => {
  const toast = useToast();
  const { data } = useAuth();

  const userId = data?.user?.id;

  return useMutation(
    (body: PostSubmissionRequestType) => postSubmission(userId, body),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title:
            "You code submission has been recorded in your profile history successfully",
          isClosable: true,
        });
      },
    },
  );
};

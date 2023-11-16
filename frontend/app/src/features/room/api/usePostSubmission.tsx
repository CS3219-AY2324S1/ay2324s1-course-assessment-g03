import { backendApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";
import { submissionSchema } from "@/types/submission";
import { Toast } from "@/components/Toast";

const postSubmissionRequestSchema = z.object({
  submission: z.object({
    otherUserId: z.number().optional(),
    questionId: z.string(),
    code: z.string(),
    lang: z.string(),
  }),
});
type PostSubmissionRequestType = z.infer<typeof postSubmissionRequestSchema>;

const postSubmissionResponseSchema = makeSuccessResponseSchema(
  z.object({
    submission: submissionSchema.omit({ users: true }),
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

  return useMutation({
    mutationFn: (body: PostSubmissionRequestType) =>
      postSubmission(userId, {
        ...body,
        submission: {
          ...body.submission,
          otherUserId:
            typeof body.submission.otherUserId === "string"
              ? parseInt(body.submission.otherUserId)
              : undefined,
        },
      }),
    onSuccess: () => {
      toast({
        render: ({ onClose }) => (
          <Toast
            status="success"
            message="Your code has been successfully saved to your profile history."
            onClose={onClose}
          />
        ),
      });
    },
  });
};

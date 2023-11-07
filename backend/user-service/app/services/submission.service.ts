import { db } from "./db.service";
import { Prisma } from "@prisma/client";

export const submissionService = {
  create: async (
    userId: string,
    otherUserId: string | undefined,
    data: Prisma.SubmissionCreateInput
  ) => {
    const submission = await db.submission.create({
      data: {
        ...data,
        userIds: {
          set: [userId, ...(otherUserId ? [otherUserId] : [])],
        },
      },
    });
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        submissionIds: {
          push: submission.id,
        },
      },
    });
    if (otherUserId) {
      const updatedOtherUser = await db.user.update({
        where: {
          id: otherUserId,
        },
        data: {
          submissionIds: {
            push: submission.id,
          },
        },
      });
    }
    return submission;
  },
  delete: (id: Prisma.SubmissionDeleteArgs["where"]["id"]) =>
    db.submission.delete({ where: { id } }),
};

import { db } from "./db.service";
import { Prisma } from "@prisma/client";

export const submissionService = {
  create: async (
    userId: number,
    otherUserId: number | undefined,
    data: Prisma.SubmissionCreateInput
  ) => {
    const submission = otherUserId
      ? await db.submission.create({
          data: {
            ...data,
            users: {
              connect: [
                {
                  id: userId,
                },

                {
                  id: otherUserId,
                },
              ],
            },
          },
        })
      : await db.submission.create({
          data: {
            ...data,
            users: {
              connect: [
                {
                  id: userId,
                },
              ],
            },
          },
        });
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        submissions: {
          connect: { id: submission.id },
        },
      },
    });
    if (otherUserId) {
      const updatedOtherUser = await db.user.update({
        where: {
          id: otherUserId,
        },
        data: {
          submissions: {
            connect: { id: submission.id },
          },
        },
      });
    }
    return submission;
  },
  delete: (id: Prisma.SubmissionDeleteArgs["where"]["id"]) =>
    db.submission.delete({ where: { id } }),
};

import { Prisma } from "@prisma/client";

const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: { avatarUrl: true, email: true, name: true },
});

export type UserPersonalData = Prisma.UserGetPayload<typeof userPersonalData>;

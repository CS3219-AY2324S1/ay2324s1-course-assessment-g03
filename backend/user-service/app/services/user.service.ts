import { db } from "./db.service";
import { Prisma } from "@prisma/client";

const userPersonalData: Prisma.UserSelect = {
  id: true,
  avatarUrl: true,
  email: true,
  name: true,
  role: true,
  submissions: {
    select: {
      id: true,
      code: true,
      lang: true,
      createdAt: true,
    },
  },
};

export const userService = {
  create: (data: Prisma.UserCreateInput) => {
    return db.user.create({
      data,
      select: userPersonalData,
    });
  },
  findAll: () => db.user.findMany(),
  delete: (id: Prisma.UserDeleteArgs["where"]["id"]) =>
    db.user.delete({ where: { id } }),
  findById: (id: Prisma.UserFindUniqueArgs["where"]["id"]) =>
    db.user.findUnique({
      where: { id },
      include: { submissions: { include: { users: true } } },
    }),
  findByEmail: (email: Prisma.UserFindUniqueArgs["where"]["email"]) =>
    db.user.findUnique({
      where: { email },
      include: { submissions: { include: { users: true } } },
    }),
  update: (
    id: Prisma.UserUpdateArgs["where"]["id"],
    data: Prisma.UserUpdateInput
  ) => db.user.update({ where: { id }, data }),
};

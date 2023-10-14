import { db } from "./db.service";
import { Prisma } from "@prisma/client";

const userPersonalData: Prisma.UserSelect = {
  id: true,
  avatarUrl: true,
  email: true,
  name: true,
  role: true,
};

export const userService = {
  create: (data: Prisma.UserCreateInput) => {
    return db.user.create({
      data,
      select: userPersonalData,
    });
  },
  delete: (id: Prisma.UserDeleteArgs["where"]["id"]) =>
    db.user.delete({ where: { id } }),
  findById: (id: Prisma.UserFindUniqueArgs["where"]["id"]) =>
    db.user.findUnique({ where: { id } }),
  findByEmail: (email: Prisma.UserFindUniqueArgs["where"]["email"]) =>
    db.user.findUnique({ where: { email } }),
  update: (id: string, data: Prisma.UserUpdateInput) =>
    db.user.update({ where: { id }, data }),
};

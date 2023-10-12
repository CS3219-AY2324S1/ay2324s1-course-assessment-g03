import { db } from "./db.service";
import { Prisma } from "@prisma/client";

const userPersonalData: Prisma.UserSelect = {
  avatarUrl: true,
  email: true,
  name: true,
};

export const userService = {
  create: (data: Prisma.UserCreateInput) => {
    return db.user.create({
      data,
      select: userPersonalData,
    });
  },
  delete: async (id: string) => db.user.delete({ where: { id } }),
  findById: (id: string) => db.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => db.user.findUnique({ where: { email } }),
  update: (id: string, data: Prisma.UserCreateInput) =>
    db.user.update({ where: { id }, data }),
};

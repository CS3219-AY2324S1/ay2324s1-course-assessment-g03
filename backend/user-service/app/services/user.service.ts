import { db } from "./db.service";
import { UserPersonalData } from "../types/userPersonalData";

export const userService = {
  create: (body: UserPersonalData) => db.user.create({ data: body }),
  delete: (id: string) => db.user.delete({ where: { id } }),
  findById: (id: string) =>
    db.user.findUnique({ where: { id }, include: { questionAttempts: true } }),
  findByEmail: (email: string) => db.user.findUnique({ where: { email } }),
  update: (id: string, body: UserPersonalData) =>
    db.user.update({ where: { id }, data: body }),
};

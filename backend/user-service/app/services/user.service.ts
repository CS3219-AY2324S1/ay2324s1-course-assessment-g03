import { db } from "./db.service";
import { UserPersonalData } from "../types/userPersonalData";

export const userService = {
  create: async (body: UserPersonalData) => {
    try {
      return await db.user.create({ data: body });
    } catch (e) {
      throw e;
    }
  },
  delete: async (id: string) => {
    try {
      return await db.user.delete({ where: { id } });
    } catch (e) {
      throw e;
    }
  },
  findById: async (id: string) => {
    try {
      return await db.user.findUnique({
        where: { id },
        include: { questionAttempts: true },
      });
    } catch (e) {
      throw e;
    }
  },
  findByEmail: async (email: string) => {
    try {
      return await db.user.findUnique({ where: { email } });
    } catch (e) {
      throw e;
    }
  },
  update: async (id: string, body: UserPersonalData) => {
    try {
      return await db.user.update({ where: { id }, data: body });
    } catch (e) {
      throw e;
    }
  },
};

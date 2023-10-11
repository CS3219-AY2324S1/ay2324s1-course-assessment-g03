import { UserBody } from "../types/user-body";
import { db } from "./db.service";

export const userService = {
    create: (body: UserBody) => db.user.create({ data: body }),
    findById: (id: string) => db.user.findUnique({ where: { id }, include: { questionAttempts: true } }),
    findByEmail: (email: string) => db.user.findUnique({ where: { email } }),
    delete: (id: string) => db.user.delete({ where: { id } }),
    update: (id: string, body: UserBody) => db.user.update({ where: { id }, data: body }),
}
import { CreateUserBody, UpdateUserBody } from "../models/user.model";
import { db } from "./db.service";

export const create = (body: CreateUserBody) => db.user.create({ data: body });

export const readUserById = (id: string) =>
  db.user.findUnique({ where: { id }, include: { questionAttempts: true } });

export const readUserByEmail = (email: string) =>
  db.user.findUnique({ where: { email }, include: { questionAttempts: true } });

export const remove = (id: string) => db.user.delete({ where: { id } });

export const update = (id: string, body: UpdateUserBody) =>
  db.user.update({ where: { id }, data: body });

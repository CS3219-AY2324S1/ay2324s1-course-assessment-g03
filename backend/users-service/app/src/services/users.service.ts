import { CreateUserBody, UpdateUserBody } from "../models/user.model";
import { db } from "./db.service";

export const create = (body: CreateUserBody) => db.user.create({ data: body })

export const read = (id: string) => db.user.findUnique({ where: { id }, include: { questions: true } })

export const remove = (id: string) => db.user.delete({ where: { id } })

export const update = (id: string, body: UpdateUserBody) => db.user.update({ where: { id }, data: body })
import { Elysia, t } from "elysia";
import { Static } from '@sinclair/typebox'

const CreateUserBody = t.Object({
    name: t.String(),
    email: t.String({ format: 'email', default: '' }),
    avatarUrl: t.String()
})

const UpdateUserBody = t.Object({
    name: t.Optional(t.String()),
    email: t.Optional(t.String({ format: 'email', default: '' })),
    avatarUrl: t.Optional(t.String())
})

export const UserModel = new Elysia().model({
    CreateUserBody,
    UpdateUserBody
})

export type CreateUserBody = Static<typeof CreateUserBody>

export type UpdateUserBody = Static<typeof UpdateUserBody>
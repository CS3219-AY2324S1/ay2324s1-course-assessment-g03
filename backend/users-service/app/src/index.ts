import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { helmet } from 'elysia-helmet'
import jwt from '@elysiajs/jwt'
import { PrismaClient } from '@prisma/client'
import { logger } from '@bogeychan/elysia-logger'
import { Role } from './constants'

const db = new PrismaClient()

const app = new Elysia({ prefix: '/users' })
  .use(cors())
  .use(helmet())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET as string
    })
  )
  .use(logger())
  .use(swagger())
  .get(
    '/:id',
    async ({ params: { id } }) =>
      await db.user.findUnique({
        where: {
          id
        },
        include: {
          questions: true
        }
      })
  )
  .post(
    '/',
    async ({ body: { avatarUrl, email } }) =>
      await db.user.create({
        data: {
          avatarUrl,
          email,
          role: Role.User
        }
      }),
    {
      body: t.Object({ avatarUrl: t.String(), email: t.String() })
    }
  )
  .put(
    '/:id',
    async ({ body: { avatarUrl, email }, params: { id } }) =>
      await db.user.update({
        where: {
          id
        },
        data: {
          avatarUrl,
          email
        }
      }),
    {
      body: t.Object({ avatarUrl: t.String(), email: t.String() })
    }
  )
  .delete(
    '/:id',
    async ({ params: { id } }) => await db.user.delete({ where: { id } })
  )
  .listen(process.env.PORT as string)

console.log(
  `Users service is running at ${app.server?.hostname}:${app.server?.port}`
)

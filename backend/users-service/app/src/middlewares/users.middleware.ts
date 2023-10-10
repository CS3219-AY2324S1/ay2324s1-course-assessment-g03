import { logger } from "@bogeychan/elysia-logger";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { helmet } from "elysia-helmet";

export const middleware = new Elysia()
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
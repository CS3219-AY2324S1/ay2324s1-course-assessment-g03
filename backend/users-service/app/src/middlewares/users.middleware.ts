import { logger } from "@bogeychan/elysia-logger";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { helmet } from "elysia-helmet";

export const middleware = new Elysia()
  .use(cors({ origin: process.env.FRONTEND_ORIGIN as string }))
  .use(helmet())
  .use(logger())
  .use(swagger());

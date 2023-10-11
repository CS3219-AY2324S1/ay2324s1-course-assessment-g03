import express from "express"
import type { Request, Response, NextFunction } from "express"
import roomRouter from "./room"
import { HttpStatus } from "../utils/HTTP_Status_Codes"
import { METHOD_NOT_ALLOWED_ERROR } from "../constants/errors"

const apiRouter = express.Router()

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('API Request received')
    next()
})

apiRouter.get("/test", (_req: Request, res: Response) => {
    res.send("Server is healthy!")
}).all("/", (_req: Request, res: Response) => {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ status: METHOD_NOT_ALLOWED_ERROR })
})

apiRouter.use("/room", roomRouter)

export default apiRouter
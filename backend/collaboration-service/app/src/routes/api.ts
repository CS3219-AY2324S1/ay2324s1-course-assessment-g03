import express from "express"
import type { Request, Response, NextFunction } from "express"
import roomRouter from "./room"
import { HttpStatus } from "../utils/HTTP_Status_Codes"
import { JSEND_STATUS } from "../types/models.type"
import { METHOD_NOT_ALLOWED_ERROR } from "../constants/errors"

const apiRouter = express.Router()

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('API Request received')
    next()
})

apiRouter.use("/room", roomRouter)


apiRouter.get("/", (_req: Request, res: Response) => {
    return res.status(HttpStatus.OK).send(
        "Welcome to PeerPrep (Collaboration service) - A project for NUS CS3219 - Group 3"
    );
}).all("/", (_req: Request, res: Response) => {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ status: JSEND_STATUS.ERROR, data: { message: METHOD_NOT_ALLOWED_ERROR } });
});



export default apiRouter
import express from "express"
import type { Request, Response, NextFunction } from "express"
import roomRouter from "./room"

const apiRouter = express.Router()

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('API Request received')
    next()
})

apiRouter.use("/room", roomRouter)

export default apiRouter
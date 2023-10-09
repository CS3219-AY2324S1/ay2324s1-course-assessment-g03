import express from "express"
import type { Request, Response, NextFunction } from "express"
import roomRouter from "./room"

const apiRouter = express.Router()

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('API Request received')
    next()
})

apiRouter.get("/test", (req: Request, res: Response) => {
    res.send("Server is healthy!")
})

apiRouter.get("/collaboration", (req: Request, res: Response) => {
    res.send("Collaboration service")
})

apiRouter.use("/room", roomRouter)

export default apiRouter
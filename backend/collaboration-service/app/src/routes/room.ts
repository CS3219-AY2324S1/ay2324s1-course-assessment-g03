import express from "express"
import type { Request, Response, NextFunction } from "express"
import { redisClient } from "../server"
import { v4 } from "uuid"
import moment from "moment"
import { HttpStatus } from "../utils/HTTP_Status_Codes"
import { createRoom } from "../models/rooms.model"

const roomRouter = express.Router()

roomRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Room Request received')
    next()
})

roomRouter.post("/create-room",
    async (_: Request,
        res: Response) => {

        const roomId = v4()

        const createRoomResponse = createRoom(roomId)

        if (!(createRoomResponse.data)) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: createRoomResponse.error ?? "" })
        }

        return res.status(HttpStatus.CREATED).json(createRoomResponse.data)
    })

roomRouter.get("/user/:userId", (req: Request<{ userId: string }>,
    res: Response<{ roomId: string, userIds: string[], creationTime: string }>) => {
    const { userId } = req.params;

    redisClient.GET("hello")
    // Get Room Details by User Logic Here

    return res.json({
        roomId: "hello",
        userIds: [],
        creationTime: new Date().toISOString()
    })
})

roomRouter.get("/:roomId", (req: Request<{ roomId: string; }>,
    res: Response<{ roomId: string; userIds: string[], creationTime: string; }>) => {

    const { roomId } = req.params;

    redisClient.SET("hello", "world")
    // Get Room Details Logic Here

    return res.json({
        roomId: roomId,
        userIds: [],
        creationTime: new Date().toISOString()
    })

})

export default roomRouter


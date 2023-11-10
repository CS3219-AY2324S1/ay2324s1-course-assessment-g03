import { z } from "zod"
import { DIFFICULTY } from "../constants/question"

export const postRoomRequestSchema = z.object({
    body: z.object({
        difficulty: z.array(z.nativeEnum(DIFFICULTY)),
        topic: z.array(z.string())
    })
})

export const getOneRoomByUserIdSchema = z.object({
    params: z.object({
        userId: z.string()
    })
})

export const getOneRoomByIdSchema = z.object({
    params: z.object({
        roomId: z.string()
    })
})
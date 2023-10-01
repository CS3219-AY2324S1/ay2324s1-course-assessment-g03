import { redisClient } from "../server";
import { v4 } from "uuid"
import moment from "moment"
import { ChangeSet, Text } from "@codemirror/state"
import { Update } from "@codemirror/collab"

export const addRoom = async (): Promise<{
    roomId: string;
    createdAt: string;
}> => {
    const roomId = v4()
    const createdAt = moment()
    const updatedAt = moment()

    await redisClient.hSet(`${roomId}:info`, {
        created: createdAt.format(),
        updated: updatedAt.format(),
        updates: JSON.stringify([]),
        pending: JSON.stringify([]),
        doc: "Start Document"
    })

    return {
        roomId: roomId, createdAt: createdAt.format()
    }
}

export const removeRoom = async (roomId: string): Promise<{
    roomId: string;
    removedAt: string;
}> => {
    await redisClient.del(`${roomId}:info`)

    return {
        roomId: roomId, removedAt: moment().format()
    }
}

export const getRoomUpdates = async (roomId: string): Promise<Update[]> => {
    const updatesData = await redisClient.hGet(`${roomId}:info`, "updates")

    console.log(updatesData)
    return updatesData ? JSON.parse(updatesData) : []
}

export const getRoomPending = async (roomId: string): Promise<any> => {
    const pendingData = await redisClient.hGet(`${roomId}:info`, "pending")

    return pendingData ? JSON.parse(pendingData) : []
}

export const getRoomDoc = async (roomId: string): Promise<Text> => {
    const docData = await redisClient.hGet(`${roomId}:info`, "doc")

    return docData ? Text.of([docData]) : Text.of([""])
}
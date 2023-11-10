import moment from "moment";
import { Text } from "@codemirror/state"
import * as types from "../types/rooms/rooms.type"
import { rooms } from "../db/rooms.db";
import { HttpStatus } from "../utils/HTTP_Status_Codes"
import { JSEND_STATUS } from "../types/models.type"
import { DEFAULT_LANGUAGE, LanguageKeyType } from "../constants/language";
import { v4 } from "uuid";
import { DifficultyType } from "../constants/question";

export const createOneRoom = (difficulty: DifficultyType[],
    topic: string[]) => {

    const roomId = v4()

    if (roomId in rooms) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.BAD_REQUEST,
            data: {
                roomId: "Room already exists"
            }
        }
    }

    const newRoom = {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of([`Welcome to Room ${roomId}`]),
        pending: [],
        difficulty,
        topic,
        users: new Map<string, types.User>(),
        userOrder: [],
        open: true,
        language: DEFAULT_LANGUAGE
    }

    rooms[roomId] = newRoom

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.CREATED,
        data: {
            created: rooms[roomId].created,
            roomId: roomId
        }
    }
}

export const getOneRoomInfo = (roomId: string) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: {
                roomId: "Room not found"
            }
        }
    }

    // Transform users into list
    const { users, userOrder, ...roomData } = rooms[roomId]
    const mappedUsers = userOrder.map(userId => users.get(userId))

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            users: mappedUsers,
            ...roomData
        }
    }
}

export const getOneRoomDoc = (roomId: string) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: {
                roomId: "Room not found"
            }
        }
    }

    const { updates, pending, doc } = rooms[roomId]

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            updates, pending, doc
        }
    }
}

export const getOneUpdateData = (roomId: string) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: { roomId: "Room not found" }
        }
    }

    const { updates, doc, pending } = rooms[roomId]

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            updates, doc, pending
        }
    }
}

export const updateOneDoc = (roomId: string, doc: Text) => {
    if (!(roomId in rooms)) {
        return {
            status: "fail",
            code: HttpStatus.NOT_FOUND,
            data: { roomId: "Room not found" }
        }
    }

    rooms[roomId].doc = doc
    rooms[roomId].updated = moment()

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            updated: rooms[roomId].updated, doc
        }
    }
}

export const joinOneRoom = (roomId: string, userId: string) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: { roomId: "Room not found" }
        }
    }

    const users = rooms[roomId].users

    if (!users.has(userId)) {
        rooms[roomId].userOrder.push(userId)
    }

    users.set(userId, { id: userId, connected: true })

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            user: { id: userId, connected: true }
        }
    }
}

export const leaveOneRoom = (roomId: string, userId: string) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: { roomId: "Room not found" }
        }
    }

    const users = rooms[roomId].users

    if (!users.has(userId)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: { userId: "User not found" }
        }
    }

    users.set(userId, { id: userId, connected: false })

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            user: { id: userId, connected: false }
        }
    }
}

export const findUserInRoom = (userId: string) => {
    for (const roomId in rooms) {
        const { users } = rooms[roomId]

        if (users.get(userId)) {
            return {
                status: JSEND_STATUS.SUCCESS,
                code: HttpStatus.OK,
                data: {
                    roomId, userId
                }
            }
        }
    }

    return {
        status: "success",
        code: HttpStatus.OK,
        data: { userId }
    }
}

export const updateOneRoomQuestionId = (roomId: string, questionId: number) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: { roomId: "Room not found" }
        }
    }

    rooms[roomId].questionId = questionId

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: { questionId }
    }
}

export const updateOneRoomLanguage = (roomId: string, language: LanguageKeyType) => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.NOT_FOUND,
            data: { roomId: "Room not found" }
        }
    }

    rooms[roomId].language = language
    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: { language }
    }
}
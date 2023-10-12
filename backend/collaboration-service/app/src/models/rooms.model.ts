import moment from "moment";
import { Text } from "@codemirror/state"
import * as types from "../types/rooms/rooms.type"
import { generateNewDocument } from "../helpers/rooms.helper";
import { rooms } from "../db/rooms.db";
import { HttpStatus } from "../utils/HTTP_Status_Codes"
import { JSEND_STATUS } from "../types/models.type"
import { DIFFICULTY, TOPIC_TAG } from "../constants/question";

export const createRoom = (roomId: string,
    difficulties: (keyof typeof DIFFICULTY)[],
    topics: (keyof typeof TOPIC_TAG)[]): types.createRoomType => {
    if (roomId in rooms) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.BAD_REQUEST,
            data: {
                roomId: "Room already exists"
            }
        }
    }

    rooms[roomId] = generateNewDocument(roomId, difficulties, topics)

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.CREATED,
        data: {
            created: rooms[roomId].created,
            roomId: roomId
        }
    }
}

export const getRoomInfo = (roomId: string): types.getRoomType => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.BAD_REQUEST,
            data: {
                roomId: "Room not found"
            }
        }
    }

    const { updates, doc, pending, updated, created } = rooms[roomId]

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            updates, doc, pending, updated, created
        }
    }
}

export const getPullUpdatesInfo = (roomId: string): types.getPullUpdatesType => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.BAD_REQUEST,
            data: {
                roomId: "Room not found"
            }
        }
    }

    const { updates, pending } = rooms[roomId]

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            updates, pending
        }
    }

}

export const getUpdateInfo = (roomId: string): types.getUpdateType => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.BAD_REQUEST,
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

export const updateDocInfo = (roomId: string, doc: Text): types.updateDocType => {
    if (!(roomId in rooms)) {
        return {
            status: "fail",
            code: HttpStatus.BAD_REQUEST,
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


export const getDocumentInfo = (roomId: string): types.getDocumentType => {
    if (!(roomId in rooms)) {
        return {
            status: JSEND_STATUS.FAILURE,
            code: HttpStatus.BAD_REQUEST,
            data: { roomId: "Room not found" }
        }
    }

    const { updates, doc } = rooms[roomId]

    return {
        status: JSEND_STATUS.SUCCESS,
        code: HttpStatus.OK,
        data: {
            updates, doc
        }
    }
}
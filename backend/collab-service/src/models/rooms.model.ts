import moment from "moment";
import { Text } from "@codemirror/state"
import { Update } from "@codemirror/collab"
import * as roomsType from "../types/rooms.type";

export const rooms: Record<string, roomsType.roomInfo> = {
    "1": {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of(["Welcome to Room 1\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]),
        pending: []
    },
    "2": {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of(["Welcome to Room 2\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]),
        pending: []
    },
    "3": {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of(["Welcome to Room 3\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]),
        pending: []
    }
}

export const createRoom = (roomId: string): ModelResponse<roomsType.createRoomData> => {
    if (roomId in rooms) {
        return { error: "Room already exists" }
    }

    const created = moment();
    const updated = moment();
    const updates: Update[] = []
    const doc = Text.of([`Welcome to Room ${roomId}`])
    const pending: ((value: any) => void)[] = []

    rooms[roomId] = {
        created, updated, updates, doc, pending
    }

    return {
        data: {
            roomId, created
        }
    }
}

export const getRoomInfo = (roomId: string): ModelResponse<roomsType.getRoomInfoData> => {
    if (!(roomId in rooms)) {
        return { error: "Room not found" }
    }

    const { updates, doc, pending, updated } = rooms[roomId]

    return {
        data: {
            updates, doc, pending, updated
        }
    }
}

export const getPullUpdatesInfo = (roomId: string): ModelResponse<roomsType.pullUpdatesData> => {
    if (!(roomId in rooms)) {
        return { error: "Room not found" }
    }

    const { updates, pending } = rooms[roomId]

    return {
        data: {
            updates, pending
        }
    }
}

export const getUpdateInfo = (roomId: string): ModelResponse<roomsType.getUpdateInfoData> => {
    if (!(roomId in rooms)) {
        return { error: "Room not found" }
    }

    const { updates, doc, pending } = rooms[roomId]

    return {
        data: {
            updates, doc, pending
        }
    }
}

export const updateDocInfo = (roomId: string, doc: Text): ModelResponse<roomsType.updateDocData> => {
    if (!(roomId in rooms)) {
        return { error: "Room not found" }
    }

    rooms[roomId].doc = doc
    rooms[roomId].updated = moment()

    return {
        data: {
            updated: rooms[roomId].updated, doc
        }
    }
}

export const getDocumentInfo = (roomId: string): ModelResponse<roomsType.getDocumentData> => {
    if (!(roomId in rooms)) {
        return { error: "Room not found" }
    }

    const { updates, doc } = rooms[roomId]

    return {
        data: {
            updates, doc
        }
    }
}



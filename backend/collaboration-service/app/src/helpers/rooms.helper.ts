import { Text } from "@codemirror/state"
import moment from "moment"
import { DIFFICULTY, TOPIC_TAG } from "../constants/question"
import { DEFAULT_LANGUAGE } from "../constants/language"
import { User } from "../types/rooms/rooms.type"
import { JSEND_STATUS } from "../types/models.type"
import { rooms } from "../db/rooms.db"

export const generateNewDocument = (roomId: string, difficulties: (keyof typeof DIFFICULTY)[], topics: (keyof typeof TOPIC_TAG)[]) => {
    return {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of([`Welcome to Room ${roomId}`]),
        pending: [],
        difficulties,
        language: DEFAULT_LANGUAGE,
        users: new Map<string, User>(),
        topics,
        open: true
    }
}
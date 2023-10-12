import { Text } from "@codemirror/state"
import moment from "moment"
import { DIFFICULTY, TOPIC_TAG } from "../constants/question"
import { DEFAULT_LANGUAGE } from "../constants/language"

export const generateNewDocument = (roomId: string, difficulty: keyof typeof DIFFICULTY, topic: keyof typeof TOPIC_TAG) => {
    return {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of([`Welcome to Room ${roomId}`]),
        pending: [],
        difficulty,
        language: DEFAULT_LANGUAGE,
        users: [],
        topic
    }
}
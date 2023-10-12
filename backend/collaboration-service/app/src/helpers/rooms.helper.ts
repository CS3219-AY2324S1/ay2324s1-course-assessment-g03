import { Text } from "@codemirror/state"
import moment from "moment"
import { DIFFICULTY, TOPIC_TAG } from "../constants/question"
import { DEFAULT_LANGUAGE } from "../constants/language"

export const generateNewDocument = (roomId: string, difficulties: (keyof typeof DIFFICULTY)[], topics: (keyof typeof TOPIC_TAG)[]) => {
    return {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of([`Welcome to Room ${roomId}`]),
        pending: [],
        difficulties,
        language: DEFAULT_LANGUAGE,
        users: [],
        topics
    }
}
import { Text } from "@codemirror/state"
import moment from "moment"

export const generateNewDocument = (roomId: string) => {
    return {
        created: moment(),
        updated: moment(),
        updates: [],
        doc: Text.of([`Welcome to Room ${roomId}`]),
        pending: []
    }
}
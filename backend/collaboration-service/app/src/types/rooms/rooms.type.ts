import { Update } from "@codemirror/collab";
import { Text } from "@codemirror/state"
import { LANGUAGES } from "../../constants/language";
import { DifficultyType, TopicType } from "../../constants/question";

export type User = {
    id: string;
    connected: boolean;
}

export type Room = {
    created: moment.Moment;
    updated: moment.Moment;
    updates: Update[]
    doc: Text;
    pending: ((value: any) => void)[];
    users: Map<string, User>;
    userOrder: string[];
    difficulty: DifficultyType[];
    topic: TopicType[];
    language: keyof typeof LANGUAGES;
    open: boolean;
}

import * as success from "./rooms.success.type";
import * as failure from "./rooms.error.type";
import { Update } from "@codemirror/collab";
import { Text } from "@codemirror/state"
import { ModelResponse } from "../models.type";
import { LANGUAGES } from "../../constants/language";
import { DIFFICULTY, TOPIC_TAG } from "../../constants/question";

export type createRoomType = ModelResponse<success.createRoomData, failure.roomIdError>

export type getRoomType = ModelResponse<success.getRoomData, failure.roomIdError>

export type getPullUpdatesType = ModelResponse<success.getPullUpdatesData, failure.roomIdError>

export type getUpdateType = ModelResponse<success.getUpdateInfoData, failure.roomIdError>

export type updateDocType = ModelResponse<success.updateDocData, failure.roomIdError>

export type getDocumentType = ModelResponse<success.getDocumentData, failure.roomIdError>

export type joinRoomType = ModelResponse<success.joinRoomData, failure.roomIdError>

export type leaveRoomType = ModelResponse<success.leaveRoomData, failure.roomIdError | failure.userIdError>

export type findRoomUserType = ModelResponse<success.findRoomUserData, null>

export type User = {
    id: string;
    connected: boolean;
}

export type roomInfo = {
    created: moment.Moment;
    updated: moment.Moment;
    updates: Update[]
    doc: Text;
    pending: ((value: any) => void)[];
    users: Map<string, User>;
    difficulties: (keyof typeof DIFFICULTY)[];
    topics: (keyof typeof TOPIC_TAG)[];
    language: keyof typeof LANGUAGES;
    open: boolean;
}


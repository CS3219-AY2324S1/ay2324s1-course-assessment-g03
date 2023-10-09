import * as success from "./rooms.success.type";
import * as failure from "./rooms.error.type";
import { Update } from "@codemirror/collab";
import { Text } from "@codemirror/state"
import { ModelResponse } from "../models.type";

export type createRoomType = ModelResponse<success.createRoomData, failure.roomIdError>

export type getRoomType = ModelResponse<success.getRoomData, failure.roomIdError>

export type getPullUpdatesType = ModelResponse<success.getPullUpdatesData, failure.roomIdError>

export type getUpdateType = ModelResponse<success.getUpdateInfoData, failure.roomIdError>

export type updateDocType = ModelResponse<success.updateDocData, failure.roomIdError>

export type getDocumentType = ModelResponse<success.getDocumentData, failure.roomIdError>

export type roomInfo = {
    created: moment.Moment;
    updated: moment.Moment;
    updates: Update[]
    doc: Text;
    pending: ((value: any) => void)[];
}


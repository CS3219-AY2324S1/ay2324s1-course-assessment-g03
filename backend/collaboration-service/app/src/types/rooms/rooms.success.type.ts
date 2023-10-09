import { Text } from "@codemirror/state"
import { Update } from "@codemirror/collab"

export type createRoomData = {
    created: moment.Moment;
    roomId: string;
}

export type getRoomData = {
    created: moment.Moment;
    updated: moment.Moment;
    updates: Update[];
    doc: Text;
    pending: ((value: any) => void)[];
}

export type getPullUpdatesData = {
    updates: Update[];
    pending: ((value: any) => void)[];
}

export type getUpdateInfoData = {
    updates: Update[];
    doc: Text;
    pending: ((value: any) => void)[];
}

export type updateDocData = {
    updated: moment.Moment;
    doc: Text;
}

export type getDocumentData = {
    updates: Update[];
    doc: Text;
}
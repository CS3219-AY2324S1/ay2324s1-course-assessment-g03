import { Update } from "@codemirror/collab"
import { Text } from "@codemirror/state"

export type createRoomData = {
    created: moment.Moment;
    roomId: string;
}

export type getRoomInfoData = {
    updates: Update[];
    doc: Text;
    pending: ((value: any) => void)[];
    updated: moment.Moment;
}

export type pullUpdatesData = {
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

export type resetDocumentData = {
}

export type roomInfo = {
    created: moment.Moment;
    updated: moment.Moment;
    updates: Update[]
    doc: Text;
    pending: ((value: any) => void)[];
}
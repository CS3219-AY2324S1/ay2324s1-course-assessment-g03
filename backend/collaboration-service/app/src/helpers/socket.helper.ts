import { ChangeSet } from "@codemirror/state";
import { Socket } from "socket.io"
import { SOCKET_API } from "../constants/socket";
import { JSEND_STATUS } from "../types/models.type";
import { getOneRoomDoc, updateOneDoc } from "../models/rooms.model";

export function handlePullUpdates(socket: Socket, version: number, roomId: string) {
    const pullUpdatesData = getOneRoomDoc(roomId)

    if (pullUpdatesData.status !== JSEND_STATUS.SUCCESS) {
        return console.error(pullUpdatesData.data)
    }

    const { updates, pending } = pullUpdatesData.data
    if (version < updates.length) {
        socket.emit(SOCKET_API.PULL_UPDATES_RESPONSE, JSON.stringify(updates.slice(version)));
    } else {
        pending.push((updates: any) => { socket.emit(SOCKET_API.PULL_UPDATES_RESPONSE, JSON.stringify(updates)) });
    }
}

export function handlePushUpdates(socket: Socket, version: number, docUpdatesData: string, roomId: string) {
    const docUpdates = JSON.parse(docUpdatesData);
    const updateInfo = getOneRoomDoc(roomId)
    if (updateInfo.status !== JSEND_STATUS.SUCCESS) {
        console.error(updateInfo.data)
    } else {
        const { updates, pending } = updateInfo.data
        let { doc } = updateInfo.data
        try {
            if (version !== updates.length) {
                socket.emit(SOCKET_API.PUSH_UPDATES_RESPONSE, false);
            } else {
                const newUpdates: { changes: ChangeSet, clientID: any }[] = []
                for (const update of docUpdates) {
                    const changes = ChangeSet.fromJSON(update.changes);
                    newUpdates.push({ changes, clientID: update.clientID });
                    updates.push({ changes, clientID: update.clientID });
                    doc = changes.apply(doc);
                    updateOneDoc(roomId, doc)
                }
                socket.emit(SOCKET_API.PUSH_UPDATES_RESPONSE, true);

                while (pending.length) {
                    pending.pop()!(newUpdates);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function handleGetDocument(socket: Socket, roomId: string) {
    const docData = getOneRoomDoc(roomId)
    if (docData.status !== JSEND_STATUS.SUCCESS) {
        console.log(docData.data)
    } else {
        const { updates, doc } = docData.data
        socket.emit(SOCKET_API.GET_DOCUMENT_RESPONSE, updates.length, doc.toString())
    }
}
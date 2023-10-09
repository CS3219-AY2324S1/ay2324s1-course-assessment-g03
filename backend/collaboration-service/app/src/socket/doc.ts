import { ChangeSet } from "@codemirror/state";
import { getDocumentInfo, getPullUpdatesInfo, getUpdateInfo, updateDocInfo } from "../models/rooms.model";
import { Socket } from "socket.io"

export function handlePullUpdates(socket: Socket, version: number, roomId: string) {
    const pullUpdatesData = getPullUpdatesInfo(roomId)

    if (pullUpdatesData.status !== "success") {
        return console.error(pullUpdatesData.data)
    }

    const { updates, pending } = pullUpdatesData.data
    if (version < updates.length) {
        socket.emit("pullUpdateResponse", JSON.stringify(updates.slice(version)));
    } else {
        pending.push((updates: any) => { socket.emit('pullUpdateResponse', JSON.stringify(updates)) });
    }
}

export function handlePushUpdates(socket: Socket, version: number, docUpdatesData: string, roomId: string) {
    const docUpdates = JSON.parse(docUpdatesData);
    const updateInfo = getUpdateInfo(roomId)
    if (updateInfo.status !== "success") {
        console.error(updateInfo.data)
    } else {
        const { updates, pending } = updateInfo.data
        let { doc } = updateInfo.data
        try {
            if (version !== updates.length) {
                socket.emit('pushUpdateResponse', false);
            } else {
                const newUpdates: { changes: ChangeSet, clientID: any }[] = []
                for (const update of docUpdates) {
                    const changes = ChangeSet.fromJSON(update.changes);
                    newUpdates.push({ changes, clientID: update.clientID });
                    updates.push({ changes, clientID: update.clientID });
                    doc = changes.apply(doc);
                    updateDocInfo(roomId, doc)
                }
                socket.emit('pushUpdateResponse', true);

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
    const docData = getDocumentInfo(roomId)
    if (docData.status !== "success") {
        console.log(docData.data)
    } else {
        const { updates, doc } = docData.data
        socket.emit('getDocumentResponse', updates.length, doc.toString())
    }
}
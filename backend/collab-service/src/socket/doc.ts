import { ChangeSet } from "@codemirror/state";
import { getDocumentInfo, getPullUpdatesInfo, getUpdateInfo, resetDocument, updateDocInfo } from "../models/rooms.model";

export function handlePullUpdates(socket: any, version: number, roomId: string) {
    const pullUpdatesData = getPullUpdatesInfo(roomId)
    if (!pullUpdatesData.data) {
        console.error(pullUpdatesData.error)
        return
    }
    const { updates, pending } = pullUpdatesData.data
    if (version < updates.length) {
        socket.emit("pullUpdateResponse", JSON.stringify(updates.slice(version)));
    } else {
        pending.push((updates: any) => { socket.emit('pullUpdateResponse', JSON.stringify(updates)) });
    }
}

export function handlePushUpdates(socket: any, version: number, docUpdatesData: string, roomId: string) {
    let docUpdates = JSON.parse(docUpdatesData);
    const updateInfo = getUpdateInfo(roomId)
    if (!updateInfo.data) {
        console.error(updateInfo.error)
    } else {
        let { updates, pending, doc } = updateInfo.data
        try {
            if (version !== updates.length) {
                socket.emit('pushUpdateResponse', false);
            } else {
                const newUpdates: { changes: ChangeSet, clientID: any }[] = []
                for (let update of docUpdates) {
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

export function handleGetDocument(socket: any, roomId: string) {
    const docData = getDocumentInfo(roomId)
    if (!docData.data) {
        console.log(docData.error)
    } else {
        const { updates, doc } = docData.data
        socket.emit('getDocumentResponse', updates.length, doc.toString())
    }
}

export function handleResetDocument(socket: any, roomId: string) {
    resetDocument(roomId)
    socket.emit('pushUpdateResponse', false)
}

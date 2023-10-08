/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { Text, ChangeSet } from "@codemirror/state"
import { Update, receiveUpdates, sendableUpdates, collab, getSyncedVersion } from "@codemirror/collab"
import { Socket } from "socket.io-client"

function pushUpdates(
    socket: Socket,
    version: number,
    fullUpdates: readonly Update[],
<<<<<<< HEAD
=======
    roomId: string
>>>>>>> db2103e (Add collab-service frontend)
): Promise<boolean> {
    // Strip off transaction data
    const updates = fullUpdates.map(u => ({
        clientID: u.clientID,
        changes: u.changes.toJSON(),
        effects: u.effects
    }))

    return new Promise(function (resolve) {
<<<<<<< HEAD
        socket.emit('pushUpdates', version, JSON.stringify(updates));
=======
        socket.emit('pushUpdates', version, JSON.stringify(updates), roomId);
>>>>>>> db2103e (Add collab-service frontend)

        socket.once('pushUpdateResponse', function (status: boolean) {
            resolve(status);
        });
    });
}

function pullUpdates(
    socket: Socket,
    version: number,
<<<<<<< HEAD
): Promise<readonly Update[]> {
    return new Promise(function (resolve) {
        socket.emit('pullUpdates', version);
=======
    roomId: string
): Promise<readonly Update[]> {
    return new Promise(function (resolve) {
        socket.emit('pullUpdates', version, roomId);
>>>>>>> db2103e (Add collab-service frontend)

        socket.once('pullUpdateResponse', function (updates: any) {
            resolve(JSON.parse(updates));
        });
    }).then((updates: any) => updates.map((u: any) => ({
        changes: ChangeSet.fromJSON(u.changes),
        clientID: u.clientID
    })));
}

export function getDocument(socket: Socket, roomId: string): Promise<{ version: number, doc: Text }> {
    return new Promise(function (resolve) {
        socket.emit('getDocument', roomId);

        socket.once('getDocumentResponse', function (version: number, doc: string) {
            resolve({
                version,
                doc: Text.of(doc.split("\n"))
            });
        });
    });
}

<<<<<<< HEAD
export const peerExtension = (socket: Socket, startVersion: number) => {
=======
export const peerExtension = (socket: Socket, startVersion: number, roomId: string) => {
>>>>>>> db2103e (Add collab-service frontend)
    const plugin = ViewPlugin.fromClass(class {
        private pushing = false
        private done = false

        constructor(private view: EditorView) { this.pull() }

        update(update: ViewUpdate) {
            if (update.docChanged || update.transactions.length) this.push()
        }

        async push() {
            const updates = sendableUpdates(this.view.state)
            if (this.pushing || !updates.length) return
            this.pushing = true
            const version = getSyncedVersion(this.view.state)
<<<<<<< HEAD
            await pushUpdates(socket, version, updates)
=======
            await pushUpdates(socket, version, updates, roomId)
>>>>>>> db2103e (Add collab-service frontend)
            this.pushing = false
            // Regardless of whether the push failed or new updates came in
            // while it was running, try again if there's updates remaining
            if (sendableUpdates(this.view.state).length)
                setTimeout(() => this.push(), 100)
        }

        async pull() {
            while (!this.done) {
                const version = getSyncedVersion(this.view.state)
<<<<<<< HEAD
                const updates = await pullUpdates(socket, version)
=======
                const updates = await pullUpdates(socket, version, roomId)
>>>>>>> db2103e (Add collab-service frontend)
                this.view.dispatch(receiveUpdates(this.view.state, updates))
            }
        }

        destroy() { this.done = true }
    })


    return [collab({ startVersion }), plugin]
}
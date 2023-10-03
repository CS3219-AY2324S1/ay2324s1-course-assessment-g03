import http from "http"
import app from "./app"
import { Server } from "socket.io"
import { ChangeSet } from "@codemirror/state"
import { getDocumentInfo, getPullUpdatesInfo, getUpdateInfo, updateDocInfo } from "./models/rooms.model"

const port = process.env.port || 8005;

const server = http.createServer(app);

const io = new Server(server, {
    // options
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {

    /* Socket API to pull updates from the server */
    socket.on('pullUpdates', (version: number, roomId: string) => {
        const pullUpdatesData = getPullUpdatesInfo(roomId)
        if (!pullUpdatesData.data) {
            console.error(pullUpdatesData.error)
        } else {
            const { updates, pending } = pullUpdatesData.data
            if (version < updates.length) {
                socket.emit("pullUpdateResponse", JSON.stringify(updates.slice(version)));
            } else {
                pending.push((updates) => { socket.emit('pullUpdateResponse', JSON.stringify(updates)) });
            }
        }
    });

    /* Socket API to push updates to the server */
    socket.on('pushUpdates', (version: number, docUpdatesData: string, roomId: string) => {
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
                    let newUpdates = [];
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

    });

    /* Socket API to get the current state of the document from the server */
    socket.on('getDocument', (roomId: string) => {
        const docData = getDocumentInfo(roomId)
        if (!docData.data) {
            console.log(docData.error)
        } else {
            const { updates, doc } = docData.data
            socket.emit('getDocumentResponse', updates.length, doc.toString())
        }
    })

    /* Socket API to disconnect from the server */
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
import http from "http"
import app from "./app"
import { Server } from "socket.io"
import { handleGetDocument, handlePullUpdates, handlePushUpdates } from "./socket/doc";

const port = process.env.PORT || 8005;

export const server = http.createServer(app,);

const io = new Server(server, {
    // options
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {

    const roomId = socket.handshake.query.roomId;

    if (typeof roomId !== "string") {
        socket.emit('error', 'Invalid roomId provided')
        socket.disconnect()
        return
    }
    socket.join(roomId)

    /* Socket API to pull updates from the server */
    socket.on('pullUpdates', (version: number) => {
        handlePullUpdates(socket, version, roomId)
    });

    /* Socket API to push updates to the server */
    socket.on('pushUpdates', (version: number, docUpdatesData: string) => {
        handlePushUpdates(socket, version, docUpdatesData, roomId)
    });

    /* Socket API to get the current state of the document from the server */
    socket.on('getDocument', () => {
        handleGetDocument(socket, roomId)
    })

    /* Socket API to disconnect from the server */
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


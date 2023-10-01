"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const redis_1 = require("redis");
const socket_io_1 = require("socket.io");
const state_1 = require("@codemirror/state");
const rooms_model_1 = require("./models/rooms.model");
const port = process.env.port || 8000;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    // options
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
exports.redisClient = (0, redis_1.createClient)();
exports.redisClient
    .connect()
    .then(() => console.log('Connected to local redis instance'))
    .catch(() => { console.error("Error connecting to local redis instance "); });
io.on('connection', (socket) => {
    socket.on('pullUpdates', (version, roomId) => {
        const pullUpdatesData = (0, rooms_model_1.getPullUpdatesInfo)(roomId);
        if (!pullUpdatesData.data) {
            console.error(pullUpdatesData.error);
        }
        else {
            const { updates, pending } = pullUpdatesData.data;
            if (version < updates.length) {
                socket.emit("pullUpdateResponse", JSON.stringify(updates.slice(version)));
            }
            else {
                pending.push((updates) => { socket.emit('pullUpdateResponse', JSON.stringify(updates)); });
            }
        }
    });
    socket.on('pushUpdates', (version, docUpdatesData, roomId) => {
        let docUpdates = JSON.parse(docUpdatesData);
        const updateInfo = (0, rooms_model_1.getUpdateInfo)(roomId);
        if (!updateInfo.data) {
            console.error(updateInfo.error);
        }
        else {
            let { updates, pending, doc } = updateInfo.data;
            try {
                if (version != updates.length) {
                    socket.emit('pushUpdateResponse', false);
                }
                else {
                    let newUpdates = [];
                    for (let update of docUpdates) {
                        let changes = state_1.ChangeSet.fromJSON(update.changes);
                        newUpdates.push({ changes, clientID: update.clientID });
                        updates.push({ changes, clientID: update.clientID });
                        doc = changes.apply(doc);
                        (0, rooms_model_1.updateDocInfo)(roomId, doc);
                    }
                    socket.emit('pushUpdateResponse', true);
                    while (pending.length) {
                        pending.pop()(newUpdates);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    });
    socket.on('getDocument', (roomId) => {
        const docData = (0, rooms_model_1.getDocumentInfo)(roomId);
        if (!docData.data) {
            console.log(docData.error);
        }
        else {
            const { updates, doc } = docData.data;
            socket.emit('getDocumentResponse', updates.length, doc.toString());
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

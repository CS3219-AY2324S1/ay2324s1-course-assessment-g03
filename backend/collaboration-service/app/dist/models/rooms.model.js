"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentInfo = exports.updateDocInfo = exports.getUpdateInfo = exports.getPullUpdatesInfo = exports.getRoomInfo = exports.createRoom = exports.rooms = void 0;
const moment_1 = __importDefault(require("moment"));
const state_1 = require("@codemirror/state");
exports.rooms = {
    "1": {
        created: (0, moment_1.default)(),
        updated: (0, moment_1.default)(),
        updates: [],
        doc: state_1.Text.of(["Welcome to Room 1\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]),
        pending: []
    },
    "2": {
        created: (0, moment_1.default)(),
        updated: (0, moment_1.default)(),
        updates: [],
        doc: state_1.Text.of(["Welcome to Room 2\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]),
        pending: []
    },
    "3": {
        created: (0, moment_1.default)(),
        updated: (0, moment_1.default)(),
        updates: [],
        doc: state_1.Text.of(["Welcome to Room 3\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]),
        pending: []
    }
};
const createRoom = (roomId) => {
    if (roomId in exports.rooms) {
        return { error: "Room already exists" };
    }
    const created = (0, moment_1.default)();
    const updated = (0, moment_1.default)();
    const updates = [];
    const doc = state_1.Text.of([`Welcome to Room ${roomId}`]);
    const pending = [];
    exports.rooms[roomId] = {
        created, updated, updates, doc, pending
    };
    return {
        data: {
            roomId, created
        }
    };
};
exports.createRoom = createRoom;
const getRoomInfo = (roomId) => {
    if (!(roomId in exports.rooms)) {
        return { error: "Room not found" };
    }
    const { updates, doc, pending, updated } = exports.rooms[roomId];
    return {
        data: {
            updates, doc, pending, updated
        }
    };
};
exports.getRoomInfo = getRoomInfo;
const getPullUpdatesInfo = (roomId) => {
    if (!(roomId in exports.rooms)) {
        return { error: "Room not found" };
    }
    const { updates, pending } = exports.rooms[roomId];
    return {
        data: {
            updates, pending
        }
    };
};
exports.getPullUpdatesInfo = getPullUpdatesInfo;
const getUpdateInfo = (roomId) => {
    if (!(roomId in exports.rooms)) {
        return { error: "Room not found" };
    }
    const { updates, doc, pending } = exports.rooms[roomId];
    return {
        data: {
            updates, doc, pending
        }
    };
};
exports.getUpdateInfo = getUpdateInfo;
const updateDocInfo = (roomId, doc) => {
    if (!(roomId in exports.rooms)) {
        return { error: "Room not found" };
    }
    exports.rooms[roomId].doc = doc;
    exports.rooms[roomId].updated = (0, moment_1.default)();
    return {
        data: {
            updated: exports.rooms[roomId].updated, doc
        }
    };
};
exports.updateDocInfo = updateDocInfo;
const getDocumentInfo = (roomId) => {
    if (!(roomId in exports.rooms)) {
        return { error: "Room not found" };
    }
    const { updates, doc } = exports.rooms[roomId];
    return {
        data: {
            updates, doc
        }
    };
};
exports.getDocumentInfo = getDocumentInfo;

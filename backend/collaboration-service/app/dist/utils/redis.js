"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomDoc = exports.getRoomPending = exports.getRoomUpdates = exports.removeRoom = exports.addRoom = void 0;
const server_1 = require("../server");
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const state_1 = require("@codemirror/state");
const addRoom = () => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = (0, uuid_1.v4)();
    const createdAt = (0, moment_1.default)();
    const updatedAt = (0, moment_1.default)();
    yield server_1.redisClient.hSet(`${roomId}:info`, {
        created: createdAt.format(),
        updated: updatedAt.format(),
        updates: JSON.stringify([]),
        pending: JSON.stringify([]),
        doc: "Start Document"
    });
    return {
        roomId: roomId, createdAt: createdAt.format()
    };
});
exports.addRoom = addRoom;
const removeRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.redisClient.del(`${roomId}:info`);
    return {
        roomId: roomId, removedAt: (0, moment_1.default)().format()
    };
});
exports.removeRoom = removeRoom;
const getRoomUpdates = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatesData = yield server_1.redisClient.hGet(`${roomId}:info`, "updates");
    console.log(updatesData);
    return updatesData ? JSON.parse(updatesData) : [];
});
exports.getRoomUpdates = getRoomUpdates;
const getRoomPending = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const pendingData = yield server_1.redisClient.hGet(`${roomId}:info`, "pending");
    return pendingData ? JSON.parse(pendingData) : [];
});
exports.getRoomPending = getRoomPending;
const getRoomDoc = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const docData = yield server_1.redisClient.hGet(`${roomId}:info`, "doc");
    return docData ? state_1.Text.of([docData]) : state_1.Text.of([""]);
});
exports.getRoomDoc = getRoomDoc;

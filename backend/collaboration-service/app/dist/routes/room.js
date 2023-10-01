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
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
const uuid_1 = require("uuid");
const HTTP_Status_Codes_1 = require("../utils/HTTP_Status_Codes");
const rooms_model_1 = require("../models/rooms.model");
const roomRouter = express_1.default.Router();
roomRouter.use((req, res, next) => {
    console.log('Room Request received');
    next();
});
roomRouter.post("/create-room", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const roomId = (0, uuid_1.v4)();
    const createRoomResponse = (0, rooms_model_1.createRoom)(roomId);
    if (!(createRoomResponse.data)) {
        return res.status(HTTP_Status_Codes_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: (_a = createRoomResponse.error) !== null && _a !== void 0 ? _a : "" });
    }
    return res.status(HTTP_Status_Codes_1.HttpStatus.CREATED).json(createRoomResponse.data);
}));
roomRouter.get("/user/:userId", (req, res) => {
    const { userId } = req.params;
    server_1.redisClient.GET("hello");
    // Get Room Details by User Logic Here
    return res.json({
        roomId: "hello",
        userIds: [],
        creationTime: new Date().toISOString()
    });
});
roomRouter.get("/:roomId", (req, res) => {
    const { roomId } = req.params;
    server_1.redisClient.SET("hello", "world");
    // Get Room Details Logic Here
    return res.json({
        roomId: roomId,
        userIds: [],
        creationTime: new Date().toISOString()
    });
});
exports.default = roomRouter;

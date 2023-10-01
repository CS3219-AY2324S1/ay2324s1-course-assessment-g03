"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = __importDefault(require("./room"));
const apiRouter = express_1.default.Router();
apiRouter.use((req, res, next) => {
    console.log('API Request received');
    next();
});
apiRouter.get("/test", (req, res) => {
    res.send("Server is healthy!");
});
apiRouter.use("/room", room_1.default);
exports.default = apiRouter;

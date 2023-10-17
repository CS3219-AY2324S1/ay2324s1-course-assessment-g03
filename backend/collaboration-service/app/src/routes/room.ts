import express from "express";
import type { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { createRoom, findUser, getRoomInfo } from "../models/rooms.model";
import { HttpStatus } from "../utils/HTTP_Status_Codes";
import { JSEND_STATUS } from "../types/models.type";
import { METHOD_NOT_ALLOWED_ERROR } from "../constants/errors";
import { DIFFICULTY, TOPIC_TAG } from "../constants/question";

const roomRouter = express.Router();

roomRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log("Room Request received");
  next();
});

roomRouter.post("/", async (req: Request<{}, {}, { difficulty: string[]; topic: string[]; }>, res: Response) => {

  const roomId = v4();

  const { difficulty, topic } = req.body;

  if (!difficulty || !(difficulty.every((d: string) => Object.keys(DIFFICULTY).includes(d)))) {
    return res.status(HttpStatus.BAD_REQUEST).json({ status: JSEND_STATUS.ERROR, data: { message: "Invalid difficulty" } });
  }

  if (!topic || !(topic.every((t: string) => Object.keys(TOPIC_TAG).includes(t)))) {
    return res.status(HttpStatus.BAD_REQUEST).json({ status: JSEND_STATUS.ERROR, data: { message: "Invalid topic" } });
  }

  const mappedDifficulties = difficulty.map((diff) => diff as keyof typeof DIFFICULTY)
  const mappedTopics = topic.map((t) => t as keyof typeof TOPIC_TAG)

  const { code, data, status } = createRoom(roomId, mappedDifficulties, mappedTopics);

  return res.status(code).json({ status, data });
}).all("/", async (_req: Request, res: Response) => {
  return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ status: JSEND_STATUS.ERROR, data: { message: METHOD_NOT_ALLOWED_ERROR } });
});

roomRouter.get("/user/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  const { code, status, data } = findUser(userId)

  return res.status(code).json({ status, data });
})

roomRouter.get(
  "/:roomId",
  (req: Request<{ roomId: string }>, res: Response) => {
    const { roomId } = req.params;

    const roomInfo = getRoomInfo(roomId);

    return res
      .status(roomInfo.code)
      .json({ status: roomInfo.status, data: roomInfo.data });
  }
).all("/:roomId", (_req: Request, res: Response) => {
  return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ status: JSEND_STATUS.ERROR, data: { message: METHOD_NOT_ALLOWED_ERROR } });
});

export default roomRouter;

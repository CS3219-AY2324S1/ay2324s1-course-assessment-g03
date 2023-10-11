import express from "express";
import type { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { createRoom, getRoomInfo } from "../models/rooms.model";
import { HttpStatus } from "../utils/HTTP_Status_Codes";
import { JSEND_STATUS } from "../types/models.type";
import { METHOD_NOT_ALLOWED_ERROR } from "../constants/errors";

const roomRouter = express.Router();

roomRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log("Room Request received");
  next();
});

roomRouter.post("/", async (_: Request, res: Response) => {
  const roomId = v4();

  const { code, data, status } = createRoom(roomId);
  return res.status(code).json({ status, data });
}).all("/", async (_req: Request, res: Response) => {
  return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ status: JSEND_STATUS.ERROR, data: { message: METHOD_NOT_ALLOWED_ERROR } });
});

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

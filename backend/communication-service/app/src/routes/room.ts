import express from "express";
import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../utils/HTTP_Status_Codes";
import { JSEND_STATUS } from "../types/models.type";
import { METHOD_NOT_ALLOWED_ERROR } from "../constants/errors";
import {
  createOneRoom,
  findUserInRoom,
  getOneRoomInfo,
} from "../models/rooms.model";
import * as roomSchemas from "../schemas/room.schemas";

const roomRouter = express.Router();

roomRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log("Room Request received");
  next();
});

roomRouter
  .post("/", async (req: Request, res: Response) => {
    try {
      const { roomId } = roomSchemas.postRoomRequestSchema.parse(req).body;
      const { code, data, status } = createOneRoom(roomId);

      return res.status(code).json({ status, data });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: JSEND_STATUS.FAILURE, data: e });
    }
  })
  .all("/", async (_req: Request, res: Response) => {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      status: JSEND_STATUS.ERROR,
      data: { message: METHOD_NOT_ALLOWED_ERROR },
    });
  });

roomRouter.get("/user/:userId", (req: Request, res: Response) => {
  try {
    const { userId } = roomSchemas.getOneRoomByUserIdSchema.parse(req).params;
    const { code, status, data } = findUserInRoom(userId);
    return res.status(code).json({ status, data });
  } catch (e) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ status: JSEND_STATUS.FAILURE, data: e });
  }
});

roomRouter
  .get("/:roomId", (req: Request, res: Response) => {
    try {
      const { roomId } = roomSchemas.getOneRoomByIdSchema.parse(req).params;
      const { code, status, data } = getOneRoomInfo(roomId);

      return res.status(code).json({ status, data });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: JSEND_STATUS.FAILURE, data: e });
    }
  })
  .all("/:roomId", (_req: Request, res: Response) => {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      status: JSEND_STATUS.ERROR,
      data: { message: METHOD_NOT_ALLOWED_ERROR },
    });
  });

export default roomRouter;

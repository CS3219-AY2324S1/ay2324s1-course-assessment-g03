import express from "express";
import type { Request, Response, NextFunction } from "express";
import roomRouter from "./room";
import { HttpStatus } from "../utils/HTTP_Status_Codes";
import { JSEND_STATUS } from "../types/models.type";
import { METHOD_NOT_ALLOWED_ERROR } from "../constants/errors";

const apiRouter = express.Router();

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  next();
});

apiRouter.use("/room", roomRouter);

export default apiRouter;

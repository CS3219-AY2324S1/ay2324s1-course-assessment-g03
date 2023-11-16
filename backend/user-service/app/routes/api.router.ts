import { Router } from "express";
import { userRouter } from "./user.router";

export const apiRouter = Router();

apiRouter.use("/users", userRouter);

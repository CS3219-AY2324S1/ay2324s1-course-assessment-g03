import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { db } from "../services/db.service";

export const userRouter = Router();

userRouter.get("/", userController.get)

/* Get user by ID */
userRouter.get("/id/:userId", userController.getById);

/* Get user by email */
userRouter.get("/email/:email", userController.getByEmail);

/* Create user */
userRouter.post("/", userController.post);

/* Update user */
userRouter.put("/id/:userId", userController.put);

/* Delete user */
userRouter.delete("/id/:userId", userController.delete);

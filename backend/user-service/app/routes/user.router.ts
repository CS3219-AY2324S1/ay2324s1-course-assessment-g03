import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();

/* Get user by ID */
userRouter.get('/id/:userId', userController.getById)

/* Get user by email */
userRouter.get('/email/:email', userController.getByEmail)

/* Create user */
userRouter.post('/', userController.post)

/* Update user */
userRouter.put('/', userController.put)

/* Delete user */
userRouter.delete('/id/:userId', userController.delete)

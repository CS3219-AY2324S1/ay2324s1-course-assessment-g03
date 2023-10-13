import { failApiResponse, successApiResponse } from "../libs";
import { userService } from "../services/user.service";
import { Request, Response } from "express";
import {
  userDeleteSchema,
  userGetByEmailSchema,
  userGetByIdSchema,
  userPostSchema,
  userPutSchema,
} from "../types/requestSchema";

const ERROR_MESSAGE = "An error occurred";

export const userController = {
  getById: async (req: Request, res: Response) => {
    const parsedReq = userGetByIdSchema.parse(req);
    try {
      const user = await userService.findById(parsedReq.params.userId);
      res.send(successApiResponse({ user }));
    } catch (e) {
      let message = ERROR_MESSAGE;
      if (e instanceof Error) {
        console.log(e.message);
        message = e.message;
      }
      res.send(failApiResponse({ message }));
    }
  },
  getByEmail: async (req: Request, res: Response) => {
    try {
      const parsedReq = userGetByEmailSchema.parse(req);
      const user = await userService.findByEmail(parsedReq.params.email);
      res.send(successApiResponse({ user }));
    } catch (e) {
      let message = ERROR_MESSAGE;
      if (e instanceof Error) {
        console.log(e.message);
        message = e.message;
      }
      res.send(failApiResponse({ message }));
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      console.log("Req", req.body);
      const parsedReq = userPostSchema.parse(req);
      const user = await userService.create(parsedReq.body.user);
      res.send(successApiResponse({ user }));
    } catch (e) {
      let message = ERROR_MESSAGE;
      if (e instanceof Error) {
        console.log(e.message);
        message = e.message;
      }
      res.send(failApiResponse({ message }));
    }
  },
  put: async (req: Request, res: Response) => {
    try {
      const parsedReq = userPutSchema.parse(req);
      const user = await userService.update(
        parsedReq.params.userId,
        parsedReq.body.user
      );
      res.send(successApiResponse({ user }));
    } catch (e) {
      let message = ERROR_MESSAGE;
      if (e instanceof Error) {
        console.log(e.message);
        message = e.message;
      }
      res.send(failApiResponse({ message }));
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const parsedReq = userDeleteSchema.parse(req);
      const user = await userService.delete(parsedReq.params.userId);
      res.send(successApiResponse({ user }));
    } catch (e) {
      let message = ERROR_MESSAGE;
      if (e instanceof Error) {
        console.log(e.message);
        message = e.message;
      }
      res.send(failApiResponse({ message }));
    }
  },
};

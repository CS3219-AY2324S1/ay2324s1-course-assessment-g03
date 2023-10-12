import { failApiResponse, successApiResponse } from "../libs";
import { userService } from "../services/user.service";
import { Request, Response } from "express";

const ERROR_MESSAGE = "An error occurred";

export const userController = {
  getById: async (req: Request, res: Response) => {
    try {
      const user = await userService.findById(req.params.userId);
      res.send(successApiResponse(user));
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
      const user = await userService.findByEmail(req.params.email);
      res.send(successApiResponse(user));
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
      const user = await userService.create(req.body);
      res.send(successApiResponse(user));
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
      const user = await userService.update(req.params.userId, req.body);
      res.send(successApiResponse(user));
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
      const user = await userService.delete(req.params.userId);
      res.send(successApiResponse(user));
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

import { failApiResponse, successApiResponse } from "../libs";
import { userService } from "../services/user.service";
import { Request, Response } from "express";

export const userController = {
  getById: async (req: Request, res: Response) => {
    try {
      res.send(successApiResponse(userService.findById(req.params.userId)));
    } catch (e) {
      res.send(failApiResponse(e));
    }
  },
  getByEmail: async (req: Request, res: Response) => {
    try {
      res.send(successApiResponse(userService.findByEmail(req.params.email)));
    } catch (e) {
      res.send(failApiResponse(e));
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      res.send(successApiResponse(userService.create(req.body)));
    } catch (e) {
      res.send(failApiResponse(e));
    }
  },
  put: async (req: Request, res: Response) => {
    try {
      res.send(
        successApiResponse(userService.update(req.params.userId, req.body))
      );
    } catch (e) {
      res.send(failApiResponse(e));
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      res.send(successApiResponse(userService.delete(req.params.userId)));
    } catch (e) {
      res.send(failApiResponse(e));
    }
  },
};

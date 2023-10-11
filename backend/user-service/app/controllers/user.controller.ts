import { successApiResponse } from "../libs";
import { userService } from "../services/user.service";
import { Request, Response } from "express";

export const userController = {
    getById: async (req: Request, res: Response) => {
        res.send(successApiResponse(await userService.findById(req.params.userId)));
    },
    getByEmail: async (req: Request, res: Response) => {
        res.send(successApiResponse(await userService.findByEmail(req.params.email)));
    },
    post: async (req: Request, res: Response) => {
        console.log(req.body)
        res.send(successApiResponse(await userService.create(req.body)));
    },
    put: async (req: Request, res: Response) => {
        res.send(successApiResponse(await userService.update(req.params.userId, req.body)));
    },
    delete: async (req: Request, res: Response) => {
        res.send(successApiResponse(await userService.delete(req.params.userId)));
    }
}
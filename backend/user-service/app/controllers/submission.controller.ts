import { failApiResponse, successApiResponse } from "../libs";
import { Request, Response } from "express";
import {
  submissionDeleteSchema,
  submissionPostSchema,
} from "../types/requestSchema";
import { submissionService } from "../services/submission.service";

const ERROR_MESSAGE = "An error occurred";

export const submissionController = {
  post: async (req: Request, res: Response) => {
    try {
      const parsedReq = submissionPostSchema.parse(req);
      const { otherUserId, ...data } = parsedReq.body.submission;
      const submission = await submissionService.create(
        parsedReq.params.userId,
        otherUserId,
        data
      );
      res.send(successApiResponse({ submission }));
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
      const parsedReq = submissionDeleteSchema.parse(req);
      const submission = await submissionService.delete(
        parsedReq.params.submissionId
      );
      res.send(successApiResponse({ submission }));
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

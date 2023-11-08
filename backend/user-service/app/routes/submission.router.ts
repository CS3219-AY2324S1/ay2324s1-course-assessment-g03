import { Router } from "express";
import { submissionController } from "../controllers/submission.controller";

export const submissionRouter = Router({ mergeParams: true });

/* Create submission */
submissionRouter.post("/", submissionController.post);

/* Delete submission */
submissionRouter.delete("/id/:submissionId", submissionController.delete);

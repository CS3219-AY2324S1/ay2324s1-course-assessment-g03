import { Router } from "express";
import { authRouter } from "./auth.router";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authMiddleware } from "../libs";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);

/**
 * API Gateway functionality
 */
apiRouter.use(
  "/users",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.USERS_SERVICE_URL,
    changeOrigin: true,
  })
);

apiRouter.use(
  "/questions",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.QUESTIONS_SERVICE_URL,
    changeOrigin: true,
  })
);

apiRouter.use(
  "/matching",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.MATCHING_SERVICE_URL,
    changeOrigin: true,
  })
);

apiRouter.use(
  "/collaboration",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.COLLABORATION_SERVICE_URL,
    changeOrigin: true,
  })
);

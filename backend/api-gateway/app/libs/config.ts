import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { CookieOptions } from "express";
import { Options as HttpProxyOptions } from "http-proxy-middleware";

export const morganConfig = morgan("combined");
export const corsConfig = cors({
  credentials: true,
  origin: process.env.FRONTEND_ORIGIN,
});
export const cookieConfig = cookieParser();

export const cookieOptions: CookieOptions = {
  httpOnly: true, // To prevent XSS attacks, we set this to true
  secure: process.env.NODE_ENV !== "development" ? true : false,
  sameSite: process.env.NODE_ENV !== "development" ? "none" : false,
  domain:
    process.env.NODE_ENV !== "development"
      ? new URL(process.env.FRONTEND_ORIGIN).host
      : undefined,
};

export const proxyOptions: HttpProxyOptions = {
  changeOrigin: true,
};

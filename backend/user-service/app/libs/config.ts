import cors from "cors";
import morgan from "morgan";
import express from "express";

export const morganConfig = morgan("combined");
export const corsConfig = cors({
  credentials: true,
  origin: process.env.FRONTEND_ORIGIN,
});

export const bodyParserConfig = express.json();

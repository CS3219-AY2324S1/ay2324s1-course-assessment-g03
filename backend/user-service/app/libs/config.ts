import cors from "cors";
import morgan from "morgan";

export const morganConfig = morgan("combined");
export const corsConfig = cors({
  credentials: true,
  origin: process.env.FRONTEND_ORIGIN,
});

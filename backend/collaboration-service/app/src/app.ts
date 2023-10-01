import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import morgan from "morgan"
import apiRouter from "./routes/api"


dotenv.config();

const app: Express = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', apiRouter)

app.get("/", (_: Request, res: Response) => {
    res.send("Hello World")
})


export default app
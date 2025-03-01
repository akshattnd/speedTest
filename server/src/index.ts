import express, { Response, Request, Application } from "express";
import router from "./routes/router";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import 'dotenv/config'
import { dbConnect } from "./configs/db";
import helmet from "helmet";

const app: Application = express();
const port = process.env.PORT || 8000;
import { rateLimit } from 'express-rate-limit'


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use("/api", router);
app.use(errorMiddleware);
app.listen(port, () => {
    dbConnect();
    console.log("listining on port : " + port)
});

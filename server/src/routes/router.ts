import { Router } from "express";
import authRouter from "./auth.routes";
import resultRouter from "./result.routes"
import userRouter from "./user.routes"
import testRouter from "./test.routes";
import auth from "../middleware/auth.middleware";
const router = Router();
router.use("/auth", authRouter);
router.use("/result", auth, resultRouter);
router.use("/user", auth, userRouter);
router.use("/test", auth, testRouter);
export default router;
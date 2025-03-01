import { Router } from "express";
import generateTest from "../controllers/test.controller";
import auth from "../middleware/auth.middleware";
const router = Router();
router.post("/", generateTest);
export default router;

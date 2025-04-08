import { Router } from "express";
import generateTest from "../controllers/test.controller";

const router = Router();
router.post("/", generateTest);
export default router;

import { Router } from "express";
import { getAllResults, getResult, saveResult } from "../controllers/result.controller";
const router = Router();
router.get("/submit", saveResult);
router.get("/user", getAllResults);
router.get("/:id", getResult);
export default router;

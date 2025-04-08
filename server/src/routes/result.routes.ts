import { Router } from "express";
import { getAllResults, getResult, saveResult } from "../controllers/result.controller";
const router = Router();
router.post("/submit", saveResult);
router.get("/user", getAllResults);
router.get("/:id", getResult);
export default router;

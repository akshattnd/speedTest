import { Router } from "express";
import { deleteProfile, profile, updateProfile } from "../controllers/user.controller";
const router = Router();
router.get("/", profile);
router.put("/", updateProfile);
router.delete("/", deleteProfile);
export default router;
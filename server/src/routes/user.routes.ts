import { Router } from "express";
import { deleteProfile, profile, updateProfile } from "../controllers/user.controller";
const router = Router();
router.get("/profile", profile);
router.put("/profile", updateProfile);
router.delete("/profile", deleteProfile);
export default router;
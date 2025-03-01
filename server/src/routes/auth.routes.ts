import { Router, Response, Request } from "express"
import { login, logout, signup } from "../controllers/auth.controller";
import { errorMiddleware } from "../middleware/error.middleware";
import auth from "../middleware/auth.middleware";
const router = Router();
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', auth, logout);
export default router;
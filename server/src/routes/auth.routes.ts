import { Router, Response, Request } from "express"
import { isAuthenticated, login, logout, signup } from "../controllers/auth.controller";
import auth from "../middleware/auth.middleware";
const router = Router();
router.get('/isAuth', auth, isAuthenticated);
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', auth, logout);
export default router;
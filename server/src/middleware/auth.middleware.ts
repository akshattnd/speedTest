import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error";
import { verifyToken } from "../utils/jwt";
import { User, IUser } from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new CustomError("unauthorize access!", 401);
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            throw new CustomError("token did not match!", 401);

        }
        const { data: id } = decodedToken as JwtPayload;

        const user = await User.findById(id) as IUser; // add .populate("results). after its creation.
        if (!user) {
            throw new CustomError("user not found! ", 404);
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}
export default auth;
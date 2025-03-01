import jwt from "jsonwebtoken";
import { CustomError } from "./error";


export const generateToken = (userId: string) => {
    try {
        return jwt.sign({
            data: userId
        }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    } catch (err) {
        throw new CustomError(err instanceof Error ? err.message : JSON.stringify(err), 500);
    }
};
export const verifyToken = (token: string) => {
    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new CustomError(err instanceof Error ? err.message : JSON.stringify(err), 500);
    }

};

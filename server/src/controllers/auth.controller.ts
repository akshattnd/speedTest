import { generateToken, verifyToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/hash";
import { CustomError } from "../utils/error";
import { Request, Response, NextFunction } from "express"
import { IUser, User } from "../models/user.model";
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new CustomError("token is required", 400);
    }
    const decodedToken = verifyToken(token)
    if (!decodedToken) {
      throw new CustomError("token did not match!", 401);
    }
    res.json({ success: true, msg: "user is authenticated" });

  } catch (err) {
    console.log(err);
    next(err)
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password") as IUser;
    if (!user) {
      throw new CustomError("user not found!", 404);
    }
    const isMatch = comparePassword(password, user.password!);
    if (!isMatch) {
      throw new CustomError("wrong passowod!", 404);
    }
    const token = generateToken(user._id as string);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production' ? true : false,
      sameSite: process.env.NODE_ENV == 'production' ? 'strict' : 'lax'
    });
    res.status(200).json({ success: true, msg: "login successfull" })
  } catch (err) {
    next(err);
  }
}
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    if (!username) throw new CustomError("Username is required!", 400);
    if (!email) throw new CustomError("Email is required!", 400);
    if (!password) throw new CustomError("Password is required!", 400);
    const existingUser = await User.findOne({ email }) as IUser;
    if (existingUser) throw new CustomError("user is already registered!", 409);
    const hash = await hashPassword(password);
    const newUser = new User({
      username, email, password: hash,
    })
    await newUser.save();
    const token = generateToken(newUser._id as string);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production' ? true : false,
      sameSite: process.env.NODE_ENV == 'production' ? 'strict' : 'lax'
    });
    res.status(200).json({ success: true, msg: "signup sucessfull" });
  } catch (err) {
    next(err);
  }
}
export const logout = (req: Request, res: Response) => {
  if (!req.user) {
    console.log(req)
  }
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV == 'production' ? 'strict' : 'lax'
  });
  res.status(200).json({ success: true, msg: "Logged out successfully!" });
};
import { generateToken, verifyToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/hash";
import { CustomError } from "../utils/error";
import { Request, Response, NextFunction } from "express"
import { User, IUser } from "../models/user.model";
import { Result } from "../models/result.model";
export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new CustomError("unauthorize access", 401);
    }
    const user = await User.findById(req.user._id).populate("results") as IUser;
    if (!user) {
      throw new CustomError("unable to find user", 404);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new CustomError("unauthorize access", 401);
    }
    const { email, password, username } = req.body;
    if (!username) {
      throw new CustomError("username field can't be empty", 404);
    }
    if (!password) {
      throw new CustomError("password field can't be empty", 404);
    }
    if (!email) {
      throw new CustomError("email field can't be empty", 404);
    }
    const hash = await hashPassword(password);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, password: hash, email }, { new: true }
    );
    res.status(200).json({ msg: "profile updated", user: updatedUser });
  } catch (err) {
    next(err);
  }

}
export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new CustomError("unauthorize access", 401);
    }
    await Result.deleteMany({ userId: req.user._id })
    const deleteUser = await User.findByIdAndDelete(req.user._id);
    if (!deleteUser) {
      throw new CustomError("unable to delete user", 500);
    }
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    res.status(200).json({ msg: "user deleted " });

  } catch (err) {
    next(err);

  }
}
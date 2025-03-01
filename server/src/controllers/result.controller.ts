import { Request, Response, NextFunction } from "express"
import { CustomError } from "../utils/error";
import { User, IUser } from "../models/user.model";
import { IResult, Result } from "../models/result.model";

export const saveResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new CustomError("unauthorize access", 409);
        }
        const { wpm, accuracy, mistakes, testId } = req.body;
        if (!testId) {
            throw new CustomError("testId is required", 404);
        }
        if (!wpm) {
            throw new CustomError("wpm is required", 404);
        }
        if (!mistakes) {
            throw new CustomError("mistakes is required", 404);
        }
        if (!accuracy) {
            throw new CustomError("accuracy is required", 404);
        }
        const existingResult = await Result.findOne({ testId }) as IResult;
        if (existingResult) {
            throw new CustomError("result is already saved", 404);
        }
        const newResult = new Result({ wpm, accuracy, mistakes, testId }) as IResult;
        await newResult.save();
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { $push: { results: newResult._id } }, { new: true });
        if (!updatedUser) {
            throw new CustomError("error while updating user data", 500);
        }
        res.status(201).json({ msg: "result saved successfully", result: newResult });
    } catch (err) {
        next(err);
    }
}
export const getResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new CustomError("unauthorized access", 409);
        }
        const { id } = req.params;
        const existingResult = await Result.findById(id) as IResult;
        if (!existingResult) {
            throw new CustomError("result with this id does not exist", 404);
        }
        res.status(200).json({ msg: "result found ", existingResult });
    } catch (err) {
        next(err);
    }
}
export const getAllResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new CustomError("unauthorized access", 409);
        }
        const results = await Result.find({ userId: req.user._id }) as Array<IResult>;
        if (!results) {
            throw new CustomError("error while searching results", 500);
        }
        res.status(200).json({ msg: "success", results });
    } catch (err) {
        next(err);
    }
}
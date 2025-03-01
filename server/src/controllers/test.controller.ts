import { CustomError } from "../utils/error";
import { Request, Response, NextFunction, response } from "express"
const generateTest = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.user) {
            throw new CustomError("unauthorize access", 409);
        }
        const { length = 100, language } = req.body;
        if (!language) {
            let response = await fetch(`https://random-word-api.herokuapp.com/word?number=${length}`);
            response = await response.json();
            res.status(200).json({ msg: "successfull", data: response });
            return;
        }
        let response = await fetch(`https://random-word-api.herokuapp.com/word?number=${length}lang=${language}?`);
        response = await response.json();
        res.status(200).json({ msg: "successfull", data: response });
    } catch (err) {
        next(err);
    }
}
export default generateTest;
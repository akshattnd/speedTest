export class CustomError extends Error {
    statusCode: number;
    constructor(msg: string, statusCode: number) {
        super(msg);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }



}
import { JwtPayload } from "jsonwebtoken";
declare module "jsonwebtoken" {
    export interface JwtPayload {
        data?: string,
        in?: string | number,
        exp?: string | number,
    }
}
import { Document, model, Schema } from "mongoose";
import { IResult } from "./result.model";
export interface IUser extends Document {
  _id: Schema.Types.ObjectId | string;
  username: string;
  email: string;
  password?: string;
  results: Array<Schema.Types.ObjectId> | Array<IResult>;
}
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,

  }, email: {
    type: String,
    required: true,
    trim: true,
    unique: true,

  }, password: {
    type: String,
    required: true,
    select: false,
  },
  results: [{
    type: Schema.Types.ObjectId, ref: "Result"
  }]

}, { timestamps: true });
export const User = model<IUser>('User', userSchema);

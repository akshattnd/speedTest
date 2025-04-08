import { Document, model, Schema, Types } from "mongoose";
export interface IResult extends Document {
  _id: Schema.Types.ObjectId;
  userId: Types.ObjectId | string;
  wpm: number;
  accuracy: number;
  testId: string;
  timeTaken: string;
}
const ResultSchema = new Schema<IResult>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  wpm: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  testId: { type: String, required: true, unique: true },
  timeTaken: { type: String, required: true }
}, { timestamps: true });
export const Result = model("Result", ResultSchema);


import { Document, ObjectId } from "mongoose";

//for Schema
export interface IPayment extends Document {
  student: ObjectId;
  refId: string;
  amount: number;
  date: Date;
  balancePayment: number;
  paidPayment: number;
}

//for incoming data (from UI req.body)
export interface INewPayment {
  student: string;
  refId: string;
  amount: number;
  date?: number;
  balancePayment: number;
  paidPayment: number;
}

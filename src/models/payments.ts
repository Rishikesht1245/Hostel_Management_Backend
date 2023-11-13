import { Model, Schema, model } from "mongoose";
import { IPayment } from "../interfaces/payment";

const paymentSchema = new Schema<IPayment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Payment must have a student"],
  },
  refId: {
    type: String,
    trim: true,
    required: [true, "Reference Id is required"],
  },
  amount: {
    type: Number,
    required: [true, "Payment must have an amount."],
  },
  balancePayment: {
    type: Number,
    required: [true, "Please specify the balance payment."],
  },
  paidPayment: {
    type: Number,
    required: [true, "Please specify the paid payment."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const paymentModel: Model<IPayment> = model("Payment", paymentSchema);

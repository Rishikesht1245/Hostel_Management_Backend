import { IComplaint } from "../interfaces/complaints";
import { isValidObjectId, model, Schema, Model } from "mongoose";

const complaintSchema = new Schema<IComplaint>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      validate: {
        validator: (studentId: string) => isValidObjectId(studentId),
        message: "Invalid student",
      },
    },
    department: {
      type: String,
      required: true,
      enum: {
        values: ["maintenance", "chef", "warden"],
        message: "Invalid department ({VALUE})",
      },
    },
    message: {
      type: String,
      required: [true, "Complaint must have a message"],
      minlength: [10, "Minimum 10 characters "],
      maxlength: [200, "Minimum 10 characters "],
    },
    status: {
      type: String,
      default: "initiated",
      enum: {
        values: ["initiated", "rejected", "approval", "issued", "resolved"],
        message: "Invalid status ({VALUE})",
      },
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      validate: {
        validator: (staffId: string) => isValidObjectId(staffId),
        message: "Invalid staff",
      },
    },
    remarks: {
      type: String,
      minlength: [4, "Minimum 4 characters required"],
      maxlength: [250, "Remarks must be shorter than 250 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);
export const ComplaintModel: Model<IComplaint> = model(
  "Complaint",
  complaintSchema
);

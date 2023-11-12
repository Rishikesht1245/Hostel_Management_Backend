import { Schema, Model, model } from "mongoose";
import { INotice } from "../interfaces/chiefWarden";

const noticeSchema = new Schema<INotice>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  audience: {
    type: {
      student: {
        type: Boolean,
        required: [true, "Specify the audience"],
      },
      staff: {
        type: Boolean,
        required: [true, "Specify the audience"],
      },
    },
    required: [true, "Notice must have a audience"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

export const NoticeModel: Model<INotice> = model("Notice", noticeSchema);

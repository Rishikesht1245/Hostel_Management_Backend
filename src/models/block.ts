import { Schema, Model, model } from "mongoose";
import validator from "validator";
import { IBlock } from "../interfaces/block";

const blockSchema = new Schema<IBlock>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Block must have a name"],
      minlength: [3, "Name must not be shorter than 3 characters"],
      maxlength: [20, "Name must not be longer than 20 characters"],
      validate: {
        validator: (value: any) => /^[a-zA-z\s]*$/.test(value),
        message: "Invalid block name",
      },
    },
    code: {
      type: String,
      required: [true, "Code is required"],
      trim: true,
      maxlength: [1, "Code must not be shorter than or equal 1 character"],
      validate: {
        validator: validator.isAlpha as any,
        message: "Invalid block code",
      },
    },
    occupancy: {
      type: Number,
      required: true,
      default: 0,
    },
    rooms: [
      {
        code: {
          type: String,
          required: [true, "Room code is required"],
          trim: true,
          maxlength: [4, "Room code must not be shorter than 4 character"],
          validate: {
            validator: (val: string) => val.length === 3,
            message: "Invalid Room code",
          },
        },
        number: {
          type: Number,
          required: [true, "Room must have a number"],
          validate: {
            validator: (number: any) => number > 0 && number <= 20,
            message: "Invalid room number",
          },
        },
        student: {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
        occupiedOn: Date,
        availability: {
          type: Boolean,
          default: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

export const BlockModel: Model<IBlock> = model("Block", blockSchema);

import { Schema, model, Model } from "mongoose";
import { IChiefWarden } from "../interfaces/chiefWarden";
import validator from "validator";

// Chief Warden schema with validation

const chiefWardenSchema = new Schema<IChiefWarden>({
  name: {
    type: String,
    required: [true, "Chief Warden must have a name"],
    minlength: [3, "Name must contain 3 or more characters"],
    maxlength: [20, "Name must not be longer than 20 characters"],
    //message property will be thrown if validation fails (false)
    validate: { validator: validator.isAlpha as any, message: "Invalid name" },
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Chief warden must have a password"],
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email: string) {
        //returns true or false
        return /[a-z0-9]+@[a-z0-9]+.com/i.test(email);
      },
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Chief warden must have a password"],
    minlength: [6, "Password must contain at least 6 characters"],
  },
  mobile: {
    type: Number,
    required: [true, "Chief warden must have a mobile number"],
    validate: {
      validator: (number: any) => number.toString().length === 10,
      message: "Invalid Phone number",
    },
  },
});

export const ChiefWardenModel: Model<IChiefWarden> = model(
  "ChiefWarden",
  chiefWardenSchema
);

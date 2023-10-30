import { Schema, Model, model } from "mongoose";
import { IStaff } from "../interfaces/staff";
import validator from "validator";

const staffSchema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: [true, "Staff must have a name"],
      minlength: [3, "Name must contain 3 or more characters"],
      maxlength: [20, "Name must not be longer than 20 characters"],
      //message property will be thrown if validation fails (false)
      validate: {
        validator: (value: any) => /^[a-zA-Z\s]*$/.test(value), // Allows only letters and spaces
        message: "Invalid name",
      },
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A staff must have an email"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          return /[a-z0-9]+@[a-z0-9]+.com/i.test(email);
        },
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: [true, "A Staff must have a password"],
      minlength: [6, "Password must contain at least 6 characters"],
    },
    mobile: {
      type: Number,
      required: [true, "A staff must have a mobile number"],
      validate: {
        validator: (number: any) => number.toString().length === 10,
        message: "Invalid phone number",
      },
    },
    role: {
      type: String,
      //enumerated set of values that are allowed for role field
      enum: {
        values: ["warden", "chef", "maintenance"],
        //{VALUE} - place holder will be replaced by the actual value
        message: "Invalid role ({VALUE})",
      },
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Invalid gender ({VALUE})",
      },
    },

    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/djcn6luvw/image/upload/v1698656940/default_img_a8ymer.webp",
    },

    address: {
      type: {
        building: {
          type: String,
          trim: true,
          required: [true, "Invalid Building in Address"],
        },
      },
      city: {
        type: String,
        trim: true,
        required: [true, "Invalid City in Address"],
      },
      pin: {
        type: Number,
        trim: true,
        required: [true, "Invalid PIN in Address"],
      },
      state: {
        type: String,
        trim: true,
        required: [true, "Invalid State in Address"],
      },
      country: {
        type: String,
        trim: true,
        required: [true, "Invalid Country in Address"],
      },
      required: [true, "Staff address is required"],
    },
  },
  { timestamps: true }
);

export const StaffModel: Model<IStaff> = model("Staff", staffSchema);

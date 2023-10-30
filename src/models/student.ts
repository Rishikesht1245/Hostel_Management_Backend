import { Schema, model, Model, isValidObjectId } from "mongoose";
import validator from "validator";
import { IStudent } from "../interfaces/student";

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, "Student must have a name"],
      minlength: [3, "Name must contain 3 or more characters"],
      maxlength: [20, "Name must not be longer than 20 characters"],
      //message property will be thrown if validation fails (false)
      validate: {
        validator: (value: any) => /^[a-zA-z\s]*$/.test(value),
        message: "Invalid name",
      },
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A Student must have an email"],
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
      required: [true, "A Student must have a password"],
      minlength: [6, "Password must contain at least 6 characters"],
    },
    mobile: {
      type: Number,
      required: [true, "A Student must have a mobile number"],
      validate: {
        validator: (number: any) => number.toString().length === 10,
        message: "Invalid phone number",
      },
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: ["science", "humanities", "commerce"],
        message: "Invalid Department",
      },
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["male", "female"],
        message: "Invalid Gender",
      },
    },
    guardianName: {
      type: String,
      required: [true, "Guardian name is required"],
      trim: true,
      validate: {
        validator: (value: any) => /^[a-zA-z\s]*$/.test(value),
        message: "Invalid name",
      },
    },
    guardianMobile: {
      type: Number,
      required: [true, "Guardian Mobile number is required"],
      validate: {
        validator: (number: any) => number.toString().length === 10,
        message: "Invalid Guardian mobile number",
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
    bloodGroup: {
      type: String,
      required: [true, "Blood Group is required"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid Blood Group",
      },
    },
    remarks: {
      type: String,
      minlength: [4, "Remarks must be longer than 4 characters"],
      maxlength: [250, "Remarks must be shorter than 250 characters"],
      trim: true,
    },
    room: {
      type: String,
      trim: true,
      validate: {
        validator: (roomCode: string) => roomCode.trim().length === 3,
        message: "Invalid room code",
      },
    },
    block: {
      type: Schema.Types.ObjectId,
      ref: "Block",
      validate: {
        // isValidObjectID used to check if it is a valid object Id or not
        validator: (blockId: string) => isValidObjectId(blockId),
        message: "Invalid Block",
      },
    },
    mealPlan: {
      type: Schema.Types.ObjectId,
      ref: "MealPlan",
      validate: {
        validator: (mealPlanId: string) => isValidObjectId(mealPlanId),
      },
      message: "Invalid Meal Plan",
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "rejected", "resident", "departed"],
        message: "Invalid Status ({VALUE})",
      },
    },
    paidPayment: {
      type: Number,
      default: 0,
    },
    balancePayment: {
      type: Number,
      default: 7500,
    },
    lastBilledMonth: {
      type: String,
      default: "Unbilled",
    },
  },
  { timestamps: true }
);

export const studentModel: Model<IStudent> = model("Student", studentSchema);

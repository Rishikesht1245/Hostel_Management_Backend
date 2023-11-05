import { Schema, Model, model } from "mongoose";
import { IMealPlan } from "../interfaces/staff";
import validator from "validator";

const mealPlanSchema = new Schema<IMealPlan>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxlength: [15, "Title must be shorter than 15 characters"],
      minlength: [5, "Title must be longer than 5 characters"],
      validate: {
        validator: (value: any) => /^[a-zA-z\s]*$/.test(value),
        message: "Title must be a string",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1000, "Price must be minimum 1000"],
      max: [10000, "Price must be maximum 10000"],
    },
    breakfast: {
      type: String,
      required: [true, "Please specify breakfast"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [100, "Maximum 100 characters"],
    },
    lunch: {
      type: String,
      required: [true, "Please specify lunch"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [100, "Maximum 100 characters"],
    },
    evening: {
      type: String,
      required: [true, "Please specify evening"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [100, "Maximum 100 characters"],
    },
    dinner: {
      type: String,
      required: [true, "Please specify dinner"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [100, "Maximum 100 characters"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const MealPlanModel: Model<IMealPlan> = model(
  "MealPlan",
  mealPlanSchema
);

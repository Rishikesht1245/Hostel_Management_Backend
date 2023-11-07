import { isValidObjectId } from "mongoose";
import * as yup from "yup";

//  login schema defined using yup to validate the data as a middleware function before reaching the route handler
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required()
    .test("isValidEmail", "Invalid e-mail", (arg) =>
      /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)
    ),
  password: yup.string().trim().required().min(6).max(16),
});

export const studentAdmissionSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required()
    .test("isValidEmail", "Invalid e-mail", (arg) =>
      /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)
    ),
  name: yup
    .string()
    .trim()
    .required()
    .min(4, "Invalid student name")
    .max(20, "Invalid student name"),
  department: yup
    .string()
    .required()
    .trim()
    .oneOf(["science", "commerce", "humanities"], "Invalid department"),
  gender: yup.string().required().oneOf(["female", "male"], "Invalid gender"),
  password: yup
    .string()
    .trim()
    .required("Required")
    .min(6, "Invalid Password")
    .max(16, "Invalid Password"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Required")
    .oneOf([yup.ref("password")], "Password must match"),
  mobile: yup
    .string()
    .required()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  guardianName: yup
    .string()
    .required()
    .trim()
    .min(4, "Invalid guardian name")
    .max(16, "Invalid guardian name"),
  guardianMobile: yup
    .string()
    .required()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  address: yup.object().shape({
    building: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid building name")
      .max(16, "Invalid building name"),
    city: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid city name")
      .max(16, "Invalid city name"),
    pin: yup
      .string()
      .required("Required")
      .trim()
      .matches(/^[0-9]{6}$/, "Invalid Pin code"),
    state: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid state name")
      .max(16, "Invalid state name"),
    country: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid country name")
      .max(16, "Invalid country name"),
  }),
  bloodGroup: yup
    .string()
    .required()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Invalid Blood Group"
    ),
  remarks: yup
    .string()
    .trim()
    .min(4, "Remarks must be longer than 4 characters")
    .max(250, "Remarks must be shorter than 250 characters"),
  room: yup
    .string()
    .trim()
    .required("Room is required")
    .max(3, "Invalid room code"),
  mealPlan: yup
    .string()
    .trim()
    .required("Meal plan is required")
    .test("Valid MongoDB _id", "Invalid Meal Plan", (arg) =>
      isValidObjectId(arg!)
    ),
  block: yup
    .string()
    .trim()
    .required("Block is required")
    .test("Valid MongoDB _id", "Invalid Invalid", (arg) =>
      isValidObjectId(arg!)
    ),
});

// Meal Plan schema
export const mealPlanSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .trim()
    .min(5, "The title must be longer than 5 characters")
    .max(15, "The title must be shorter than 15 characters"),
  price: yup
    .number()
    .positive()
    .required("Price is required")
    .min(1000, "Minimum 1000")
    .max(10000, "Maximum 10000"),
  breakfast: yup
    .string()
    .required("Breakfast is required")
    .trim()
    .min(5, "Break fast must be longer than 5 characters")
    .max(100, "Break fast must be longer than 5 characters"),
  lunch: yup
    .string()
    .required("lunch is required")
    .trim()
    .min(5, "lunch must be longer than 5 characters")
    .max(100, "lunch must be longer than 5 characters"),
  evening: yup
    .string()
    .required("evening is required")
    .trim()
    .min(5, "evening must be longer than 5 characters")
    .max(100, "evening must be longer than 5 characters"),
  dinner: yup
    .string()
    .required("dinner is required")
    .trim()
    .min(5, "dinner must be longer than 5 characters")
    .max(100, "dinner must be longer than 5 characters"),
  active: yup.bool().oneOf([true, false], "Must be a true or false"),
  subscribers: yup.number().positive().integer(),
});

//schema for req.body
export const newBlockSchema = yup.object().shape({
  name: yup
    .string()
    .required("Block name is required ")
    .trim()
    .min(3, "Min 3 characters")
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid block name"),
  code: yup
    .string()
    .required("Block code is required ")
    .trim()
    .matches(/^[A-Z]*$/, "Invalid Block code"),
  numberOfRooms: yup
    .number()
    .required("Number of room is required")
    .positive()
    .integer()
    .min(5, "Minimum 5 rooms")
    .max(20, "Maximum 20 rooms"),
});

export const staffSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .min(4, "Invalid Name")
    .max(16, "Invalid Name"),
  email: yup.string().email().required(),
  password: yup.string().trim().required().min(8).max(16),
  mobile: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  role: yup.string().oneOf(["warden", "chef", "maintenance"]).required(),
  gender: yup.string().oneOf(["male", "female"]).required(),
  profilePic: yup.string().trim(),
  address: yup.object().shape({
    building: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid building name")
      .max(16, "Invalid building name"),
    city: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid city name")
      .max(16, "Invalid city name"),
    pin: yup
      .string()
      .required("Required")
      .trim()
      .matches(/^[0-9]{6}$/, "Invalid Pin code"),
    state: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid state name")
      .max(16, "Invalid state name"),
    country: yup
      .string()
      .required("Required")
      .trim()
      .min(4, "Invalid country name")
      .max(16, "Invalid country name"),
  }),
});

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

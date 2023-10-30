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

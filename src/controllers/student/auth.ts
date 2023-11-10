import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { StudentAuth } from "../../repositories/student";
import { IStudent } from "../../interfaces/student";
import ErrorResponses from "../../errors/ErrorResponse";
import { dataFormatter } from "../../utils/jsonFormatter";
import { signToken } from "../../utils/tokenManager";

const studentAuth = new StudentAuth();

export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { _id, name, email, profilePic, mobile, status } =
    await studentAuth.login<IStudent>(req.body.email, req.body.password);

  // only resident students are allowed to login
  if (status !== "resident")
    throw ErrorResponses.customError(`${status} student`.toUpperCase());

  res.status(200).json({
    ...dataFormatter({ _id, name, email, profilePic, mobile }),
    token: signToken(_id!, email, "student"),
  });
});

// sign Up
export const newAdmission: RequestHandler = asyncHandler(async (req, res) => {
  const newStudent = await studentAuth.signUp(req.body);
  res.status(200).json(dataFormatter(newStudent));
});

//Reset Password
export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const resetPassword = await studentAuth.resetPassword(
    req?.tokenPayload?.email!,
    req?.body?.currentPassword,
    req?.body?.newPassword
  );
  res.status(200).json(dataFormatter(resetPassword));
});

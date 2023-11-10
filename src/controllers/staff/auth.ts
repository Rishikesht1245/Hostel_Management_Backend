import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { IStaff } from "../../interfaces/staff";
import { StaffAuth } from "../../repositories/staff";
import { dataFormatter } from "../../utils/jsonFormatter";
import { signToken } from "../../utils/tokenManager";

const staffAuth = new StaffAuth();

// New Staff (no signUp )
export const newStaff: RequestHandler = asyncHandler(async (req, res) => {
  //destructuring from body
  const { name, email, mobile, password, role, gender, address }: IStaff =
    req.body;

  const newStaffData = { name, email, mobile, password, gender, address, role };

  const result = await staffAuth.signUp(newStaffData);
  res.status(201).json(dataFormatter(result));
});

// staff login
export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { _id, name, email, mobile, role, profilePic } =
    await staffAuth.login<IStaff>(req.body.email, req.body.password);

  res.status(200).json({
    ...dataFormatter({
      _id,
      name,
      email,
      mobile,
      department: role,
      profilePic,
    }),
    token: signToken(_id, email, "staff", role),
  });
});

// staff reset password
export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const result = await staffAuth.resetPassword(
    req.tokenPayload.email,
    req.body.currentPassword,
    req.body.newPassword
  );
  res.status(200).json(dataFormatter("Password updated"));
});

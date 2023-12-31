// all the routes related to authentication for chiefWarden
import { ChiefWardenAuth } from "../../repositories/chiefWarden";
import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormatter } from "../../utils/jsonFormatter";
import { signToken } from "../../utils/tokenManager";
import { IChiefWarden } from "../../interfaces/chiefWarden";

// no constructor
const chiefWarden = new ChiefWardenAuth();

//  login chief warden : no need to use try catch as we are using async handler
export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { mobile, email, name, _id } = await chiefWarden.login<IChiefWarden>(
    req.body.email,
    req.body.password
  );

  res.status(200).json({
    ...dataFormatter({ name, email, mobile, _id }),
    token: signToken(_id, email, "chief-warden"),
  });
});

// sign up : not needed in production
export const signUp: RequestHandler = asyncHandler(async (req, res) => {
  const newChiefWarden = await chiefWarden.signUp(req.body);
  res.status(200).json(dataFormatter(newChiefWarden));
});

//reset password
export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const result = await chiefWarden.resetPassword(
    req.tokenPayload?.email,
    req.body.currentPassword,
    req.body.newPassword
  );
  res.status(200).json(dataFormatter(result));
});

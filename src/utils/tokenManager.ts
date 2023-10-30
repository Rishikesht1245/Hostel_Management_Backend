import { sign, JwtPayload, verify } from "jsonwebtoken";
import { TokenDepartment, TokenRole } from "../interfaces/auth";
import { ObjectId } from "mongoose";

// sign token
export const signToken = (
  _id: ObjectId,
  email: string,
  role: TokenRole,
  department?: TokenDepartment
): JwtPayload | string => {
  return sign(
    // data to be stored inside the token
    { _id, email, role, department },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};

// verify the token
export const verifyToken = (token: string) =>
  verify(token, process.env.JWT_SECRET as string);

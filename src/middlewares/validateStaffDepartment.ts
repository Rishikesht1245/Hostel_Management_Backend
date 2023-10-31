import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../errors/ErrorResponse";
import { TokenDepartment } from "../interfaces/auth";

export const validateStaffRole = (
  inputDepartment: TokenDepartment
): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    // token payload will be attached to the req by previous middleware for jwt authentication
    if (!req.tokenPayload)
      throw ErrorResponses.unAuthorized("Authorization Required");
    // only staffs can access the routes after this middleware
    if (
      req.tokenPayload.role !== "staff" ||
      inputDepartment !== req.tokenPayload.department
    )
      throw ErrorResponses.unAuthorized(`Route for ${inputDepartment} staff`);
    next();
  });

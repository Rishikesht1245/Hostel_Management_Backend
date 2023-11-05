import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../errors/ErrorResponse";
import { IToken, TokenRole } from "../interfaces/auth";
import { verifyToken } from "../utils/tokenManager";
import validator from "validator";

export const checkAuth = (inputRole: TokenRole): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization)
      throw ErrorResponses.unAuthorized("Authorization required");
    const token = req.headers.authorization.replace("Bearer ", "");
    const { _id, role, email, department } = verifyToken(token) as IToken;
    if (role !== inputRole)
      throw ErrorResponses.unAuthorized(`Route for ${inputRole}`);
    if (!_id || !email || !role || !validator.isMongoId(_id))
      throw ErrorResponses.badRequest();
    req.tokenPayload = { _id, email, role, department };
    next();
  });

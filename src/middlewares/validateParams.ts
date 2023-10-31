import { RequestHandler } from "express";
import ErrorResponses from "../errors/ErrorResponse";
import validator from "validator";

export const validate_id: RequestHandler = (req, res, next) => {
  if (!req.params._id || !validator.isMongoId(req.params._id))
    throw ErrorResponses.badRequest();
  next();
};

export const validate_email: RequestHandler = (req, res, next) => {
  if (!req.params.email || !validator.isEmail(req.params.email))
    throw ErrorResponses.badRequest();
  next();
};

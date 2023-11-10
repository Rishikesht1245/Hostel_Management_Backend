import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../errors/ErrorResponse";

// middleware function so returns a request handler
export const validate = (schema: any): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    try {
      console.log(req.body);
      //.validate here is function provided by yup and stripUnknown true means remove the field in req.body if that field not present in schema
      req.body = await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (error: any) {
      //  if validation fails throw the error
      throw ErrorResponses.unAuthorized(error.errors?.[0]);
    }
  });

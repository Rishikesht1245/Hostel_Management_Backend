import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponse";
import { JsonWebTokenError } from "jsonwebtoken";
import { error } from "console";

const appError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Error handler for development
  console.log(err);
  // custom and expected Error handlers
  if (err instanceof ErrorResponses) {
    return res.status(err.statusCode).json({
      status: "fail",
      operational: true,
      message: err.message,
    });
  }

  // Mongo Validation Error Handler : when mongo DB validation fails the error name will be ValidationError and  inside errors the data will be present
  if (err.name === "ValidationError") {
    console.log("reached validation error");
    const mongoError: any = err;
    const ValidationError: any = Object.values(mongoError.errors);
    // forbidden
    return res.status(403).json({
      status: "fail",
      operational: true,
      message: ValidationError[0].message,
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: "fail",
      operational: true,
      message: "Unauthorized access restricted",
    });
  }

  //Unexpected Error
  console.log("Unexpected Error", err);
  return res.status(500).json({
    status: "error",
    operational: false,
    message: err.message ? err.message : "something went wrong!",
  });
};

export default appError;

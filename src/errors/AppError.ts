import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponse";
import { JsonWebTokenError } from "jsonwebtoken";

const appError = (err: Error, req: Request, res: Response) => {
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

  // Mongo Validation Error Handler
  if (err.name === "ValidationError") {
    const mongoError: any = err;
    const ValidationError: any = Object.values(mongoError.error);
    res.status(403).json({
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
    message: "something went wrong!",
  });
};

import { verifyToken } from "../utils/tokenManager";
import ErrorResponses from "../errors/ErrorResponse";
import asyncHandler from "express-async-handler";
import { IToken } from "../interfaces/auth";
import { dataFormatter } from "../utils/jsonFormatter";

// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
//  Using async handler there is no need to use explicit try catch : it will catch the error and send it to error handling middleware
// handling 404 end points
export const endPointNotFound = asyncHandler(async (req, res) => {
  throw ErrorResponses.endPointNotFound(req.originalUrl);
});

// verify authorization headers : For Protected route in client side
export const verifyAuth = asyncHandler(async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw ErrorResponses.unAuthorized("Authorization Required");
    const token = req.headers.authorization.replace("Bearer", "");
    const { _id } = verifyToken(token) as IToken;
    res.json(dataFormatter("Authorized User"));
  } catch (error) {
    throw ErrorResponses.unAuthorized("Access denied");
  }
});

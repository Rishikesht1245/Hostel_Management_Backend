import ErrorResponses from "src/errors/ErrorResponse";
import asyncHandler from "express-async-handler";

// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
//  Using async handler there is no need to use explicit try catch : it will catch the error and send it to error handling middleware
// handling 404 end points
export const endPointNotFound = asyncHandler(async (req, res) => {
  throw ErrorResponses.endPointNotFound(req.originalUrl);
});

// verify authorization headers
export const verifyAuth = asyncHandler(async (req, res) => {});

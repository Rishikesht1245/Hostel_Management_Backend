import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { PaymentService } from "../../services/payment";
import ErrorResponses from "../../errors/ErrorResponse";

// services
const paymentService = new PaymentService();

// all payments
export const allPayments: RequestHandler = asyncHandler(async (req, res) => {
  const allPayments = await paymentService.allPaymentOfStudent(
    req.tokenPayload?._id
  );
  res.status(200).json(allPayments);
});

// other handlers pending (razor pay integration)

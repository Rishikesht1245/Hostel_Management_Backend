import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { PaymentService } from "../../services/payment";
import { dataFormatter } from "../../utils/jsonFormatter";

const paymentService = new PaymentService();

export const yearlyRevenue: RequestHandler = asyncHandler(async (req, res) => {
  const yearlyRevenue = await paymentService.yearlyRevenue();
  res.status(200).json(dataFormatter(yearlyRevenue));
});

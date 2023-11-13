import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { PaymentService } from "../../services/payment";
import { dataFormatter } from "../../utils/jsonFormatter";

const paymentService = new PaymentService();

export const allPayments: RequestHandler = asyncHandler(async (req, res) => {
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    if (!filterObj[filter] || filter !== "refId") delete filterObj[filter];
  }

  if (filterObj.refId) {
    filterObj.refId = {
      $regex: filterObj.ref,
      $options: "i",
    };
  }

  const allPayments = await paymentService.allPayments(filterObj);
  res.status(200).json(dataFormatter(allPayments));
});

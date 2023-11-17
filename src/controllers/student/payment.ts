import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { PaymentService } from "../../services/payment";
import { instance } from "../../config/razorpay";
import ErrorResponses from "../../errors/ErrorResponse";
import { dataFormatter } from "../../utils/jsonFormatter";
import * as crypto from "crypto";
import { StudentService } from "../../services/student";
import { INewPayment } from "../../interfaces/payment";

// services
const paymentService = new PaymentService();
const studentService = new StudentService();

// all payments
export const allPayments: RequestHandler = asyncHandler(async (req, res) => {
  const allPayments = await paymentService.allPaymentOfStudent(
    req.tokenPayload?._id
  );
  res.status(200).json(dataFormatter(allPayments));
});

//  Initiating payment create order in razor pay
export const initiatePayment: RequestHandler = asyncHandler(
  async (req, res) => {
    const options = {
      amount: req?.body?.amount ? req?.body?.amount * 100 : 0, //converting rupees to paisa
      currency: "INR",
      payment_capture: 1, // auto capturing by razor pay , 0 -> manual capturing
    };

    //     Creating order
    const orderDetails = await instance.orders.create(options);
    if (!orderDetails) throw ErrorResponses.customError("Payment Failed");
    res.status(200).json(dataFormatter(orderDetails));
  }
);

//  Successful payment
export const successfulPayment: RequestHandler = asyncHandler(
  async (req, res) => {
    const { orderCreationId, razorpayPaymentId, razorpaySignature, amount } =
      req.body;

    // // razorpay signature is generated in the client side using the below algorithm using Crypto
    // // so in server side we manually create the signature using crypto and compare the signature send from client
    // const signature = crypto
    //   .createHmac(
    //     // creating hash based message authenticated code
    //     "sha256",
    //     process.env.RAZORPAY_API_SECRET as string
    //   )
    //   // updating the hmac object with data to be hashed (orderCreationID and razorPayPaymentID concatenation)
    //   // no space allowed between pipes |
    //   .update(`${orderCreationId}|${razorPayPaymentId}`)
    //   // final hashed value in hexadecimal format
    //   .digest("hex");

    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");

    if (signature !== razorpaySignature)
      throw ErrorResponses.customError("Transaction is not legit");
    // saving data to student document
    const { paidPayment, balancePayment } = await studentService.addPayment(
      req.tokenPayload?._id!,
      +amount
    );

    //     saving paid data in payment collection
    const newPaymentData: INewPayment = {
      student: req.tokenPayload?._id!,
      refId: razorpayPaymentId.replace("pay_", ""),
      amount: +amount / 100,
      date: Date.now(),
      balancePayment: balancePayment,
      paidPayment: paidPayment,
    };
    await paymentService.newPayment(newPaymentData);
    res
      .status(201)
      .json(dataFormatter(`Payment of ₹${+amount / 100} successful`));
  }
);

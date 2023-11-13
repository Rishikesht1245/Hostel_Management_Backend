import { CRUD } from "./CRUD";
import { Model } from "mongoose";
import { INewPayment, IPayment } from "../interfaces/payment";
import { paymentModel } from "../models/payments";

export abstract class PaymentRepo extends CRUD {
  model: Model<IPayment> = paymentModel;

  // all Payments
  protected async allPaymentsWithStudent(filterObj: object) {
    return await this.findAndPopulate(
      { ...filterObj },
      {
        path: "student",
        select: "name email",
      }
    );
  }

  //    Create a new payment
  protected async createPayment(data: INewPayment): Promise<IPayment> {
    return await this.create(data);
  }

  //    Yearly revenue
  protected async yearlyRevenueDataByYear(year?: number) {
    const aggregatedResult = await this.model.aggregate([
      {
        $project: {
          _id: 0,
          amount: "$amount",
          //$month is a operator get month from date
          month: {
            $month: "$date",
          },
          year: {
            $year: "$date",
          },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          //Fields to be involved in each group
          //$sum : 1 , count of documents in each group
          totalNumberOfPayments: { $sum: 1 },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $match: {
          "_id.year": year || new Date().getFullYear(),
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);
    return aggregatedResult;
  }
}

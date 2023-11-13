import ErrorResponses from "../errors/ErrorResponse";
import { INewPayment, IPayment } from "../interfaces/payment";
import { PaymentRepo } from "../repositories/payments";

export class PaymentService extends PaymentRepo {
  // all payments
  async allPayments(filterObj?: any): Promise<IPayment[]> {
    const allPayments = await this.allPaymentsWithStudent({ ...filterObj });
    if (allPayments.length === 0) throw ErrorResponses.noDataFound("Payments");
    return allPayments as IPayment[];
  }

  //single student all payments
  async allPaymentOfStudent(student: string): Promise<IPayment[]> {
    return await this.allPayments({ student });
  }

  // New Payment
  async newPayment(data: INewPayment): Promise<IPayment> {
    return await this.createPayment(data);
  }

  // Yearly revenue
  async yearlyRevenue(): Promise<
    { month: number; totalPayments: number; revenue: number }[]
  > {
    const revenueData = await this.yearlyRevenueDataByYear();
    console.log(revenueData);
    const yearlyData: {
      month: number;
      totalPayments: number;
      revenue: number;
    }[] = [];
    for (let i = 1; i <= 12; i++) {
      yearlyData.push({ month: i, totalPayments: 0, revenue: 0 });
    }
    revenueData?.forEach((monthlyData) => {
      //  0th element onwards so -1 is used
      yearlyData[monthlyData._id.month - 1].totalPayments =
        monthlyData.totalPayments;
      yearlyData[monthlyData._id.month - 1].revenue = monthlyData.revenue;
    });
    return yearlyData;
  }
}

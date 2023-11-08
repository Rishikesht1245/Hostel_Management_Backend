import { AuthService, AuthRoles } from "../services/auth";
import { IStudent } from "../interfaces/student";
import { studentModel } from "../models/student";
import { hashPassword } from "../utils/passwordManager";
import { CRUD } from "./CRUD";
import { Model } from "mongoose";
import ErrorResponses from "../errors/ErrorResponse";

export class StudentAuth extends AuthService {
  public role: AuthRoles = "student";

  // find method
  async find<IStudent>(email: string): Promise<IStudent | null> {
    return await studentModel.findOne({ email });
  }

  // update password method
  async updatePassword<IStudent>(
    email: string,
    newPassword: string
  ): Promise<string | null> {
    const hashedPassword = await hashPassword(newPassword);
    await studentModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    return `Password updated.`;
  }
}

// Repo class for other student related activities by CW and staffs

export abstract class StudentRepo extends CRUD {
  // model - abstract property in CRUD Class
  model = studentModel;

  // add new Student - not needed in prod
  async createStudent(data: IStudent) {
    try {
      return await this.create(data);
    } catch (error) {
      throw ErrorResponses.mongoError();
    }
  }

  //get all students Email
  async allStudentsEmail(): Promise<string[]> {
    const aggregatedResult = await this.model.aggregate([
      {
        $match: {},
      },
      { $project: { email: 1, _id: 0 } },
    ]);
    //return email as an string array - aggregated result will be an array with objects (for all users)
    return aggregatedResult.map((emailObj) => emailObj.email);
  }

  //payment status of all students
  async paymentStatData(): Promise<{
    paid: number;
    pending: number;
  }> {
    const aggregatedResult = await this.model.aggregate([
      {
        $match: {},
      },
      {
        //_id null means single group with other mentioned values
        $group: {
          _id: null,
          paid: { $sum: "$paidPayment" },
          pending: { $sum: "$balancePayment" },
        },
      },
    ]);
    // delete _id other wise _id : null will be there in result
    delete aggregatedResult[0]._id;
    return aggregatedResult[0];
  }
}

import { StaffModel } from "../models/staff";
import { AuthRoles, AuthService } from "../services/auth";
import { IStaff } from "../interfaces/staff";
import { hashPassword } from "../utils/passwordManager";
import { CRUD } from "./CRUD";
import ErrorResponses from "../errors/ErrorResponse";

export class StaffAuth extends AuthService {
  // Role of the user
  public role: AuthRoles = "staff";

  // find method
  async find<IStaff>(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }

  // updatePassword method
  async updatePassword<IStaff>(
    email: string,
    newPassword: string
  ): Promise<string | null> {
    const hashedPassword = await hashPassword(newPassword);
    await StaffModel.findOneAndUpdate({ email }, { password: hashedPassword });
    return `Password updated.`;
  }
}

export class StaffRepo extends CRUD {
  // in which model we have to do the crud operations
  model = StaffModel;

  //fetching all staffs
  protected async allStaffsByFilter(filter?: any): Promise<IStaff[]> {
    return await this.findAll(filter);
  }

  //  Get single staff by email
  protected async single(email: string): Promise<IStaff | null> {
    //  {email : email} as query
    return this.findOne({ email });
  }

  // update single staff
  protected async update(email: string, data: any) {
    if (data.password) data.password = await hashPassword(data.password);
    const updatedStaff = await this.findOneAndUpdate({ email }, data);
    //output error handling in repo
    if (!updatedStaff) throw ErrorResponses.noDataFound("staff");
    return updatedStaff;
  }

  // get all staffs emails
  protected async allStaffsEmail(): Promise<string[]> {
    const aggregatedResult = await this.model.aggregate([
      { $match: {} },
      {
        $project: {
          email: 1,
          _id: 0,
        },
      },
    ]);
    // emails in array format
    return aggregatedResult.map((emailObj) => emailObj.email);
  }
}

import { StaffModel } from "../models/staff";
import { AuthRoles, AuthService } from "../services/auth";
import { IStaff } from "../interfaces/staff";
import { hashPassword } from "../utils/passwordManager";

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

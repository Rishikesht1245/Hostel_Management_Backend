import { AuthService, AuthRoles } from "../services/auth";
import { IStudent } from "../interfaces/student";
import { studentModel } from "../models/student";
import { hashPassword } from "../utils/passwordManager";

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

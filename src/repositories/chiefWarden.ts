import { AuthRoles, AuthService } from "../services/auth";
import { ChiefWardenModel } from "../models/chiefWarden";
import { IChiefWarden } from "../interfaces/chiefWarden";
import { hashPassword } from "../utils/passwordManager";

/*  ChiefWardenRepo class extends from AuthService Abstract class so we need to implement all the abstract variables and 
methods present there, also we can call the other no abstract functions present over there*/
export class ChiefWardenAuth extends AuthService {
  public role: AuthRoles = "chief-warden";

  //   find person with email
  async find<IChiefWarden>(email: string): Promise<IChiefWarden | null> {
    return await ChiefWardenModel.findOne({ email });
  }

  // update password method
  async updatePassword<IChiefWarden>(
    email: string,
    newPassword: string
  ): Promise<string | null> {
    const hashedPassword = await hashPassword(newPassword);
    await ChiefWardenModel.updateOne({ email }, { password: hashedPassword });
    return "Password Updated";
  }
}

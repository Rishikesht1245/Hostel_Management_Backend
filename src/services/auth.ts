import { ChiefWardenModel } from "../models/chiefWarden";
import ErrorResponses from "../errors/ErrorResponse";
import { LoginCred } from "../interfaces/auth";
import { comparePassword, hashPassword } from "../utils/passwordManager";
import { studentModel } from "../models/student";
import { StaffModel } from "../models/staff";
import { string } from "yup";

// Unified authentication service for all type of users

export type AuthRoles = "student" | "staff" | "chief-warden";

export abstract class AuthService {
  // role of the user : Abstract property should be implemented in the child classes which extends from this class
  abstract role: AuthRoles;

  //find method blue print (function will be implemented in the child class) (T will be passed as generics)
  abstract find<T>(email: string): Promise<T | null>;

  // update password method
  abstract updatePassword<T>(
    email: string,
    newPassword: string
  ): Promise<string | null>;

  // Generics login signup and reset password method for all types of users

  // ==================  login ================== //
  /*T can be of any type that conforms loginCred :
  the function will be invoked in the controller so no need to wrap it in try catch we use it in controller*/
  async login<T extends LoginCred>(
    email: string,
    password: string
  ): Promise<T> {
    const existingUser: T | null = await this.find(email.trim().toLowerCase());
    if (!existingUser) throw ErrorResponses.noDataFound(this.role);
    const validatePassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!validatePassword)
      throw ErrorResponses.unAuthorized("Invalid Password");
    // to remove password while storing in local storage
    existingUser.password = "Encrypted Password : P";
    return existingUser;
  }

  // ==================  signup ================== //

  async signUp(data: any): Promise<string | void> {
    let collection;
    // switching to the respective collection based on the role of the user
    switch (this.role) {
      case "chief-warden":
        collection = ChiefWardenModel;
        break;
      case "student":
        collection = studentModel;
        break;
      case "staff":
        collection = StaffModel;
        break;
    }

    if (!collection) throw new Error("Error Signing Up " + this.role);
    const existingData = await this.find(data.email);
    if (existingData)
      throw new Error(`Your email ${data.email} has already taken`);
    data.password = await hashPassword(data.password);
    const newData = new collection(data);
    await newData.save();
    return `${data.name} signed up successfully`;
  }

  //Reset Password
  async resetPassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<string | null> {
    // for ensuring the current password is correct
    await this.login(email, currentPassword);
    return await this.updatePassword(email, newPassword);
  }
}

//all interfaces which are related to the staffs
import { Document } from "mongoose";

export interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
  role: "warden" | "chef" | "maintenance";
  gender: "male" | "female";
  profilePic?: string;
  address: IStaffAddress;
}

export interface IStaffAddress {
  building: string;
  city: string;
  pin: number;
  state: string;
  country: string;
}

export type Department = "maintenance" | "chef" | "warden";

export interface IMealPlan {
  title: string;
  price: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  active?: boolean;
  subscribers?: number;
}

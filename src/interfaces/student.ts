import { ObjectId } from "mongoose";
import { Document } from "mongoose";
import { IMealPlan } from "./staff";

export interface IStudent extends Document {
  _id?: ObjectId;
  name: string;
  email: string;
  department: "science" | "humanities" | "commerce";
  gender: "male" | "female";
  password: string;
  mobile: number;
  guardianName: string;
  guardianMobile: number;
  profilePic?: string;
  address: {
    building: string;
    city: string;
    pin: number;
    state: string;
    country: string;
  };
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  remarks?: string;
  room: string;
  //   Object Id type for mongoose ID , reference field here
  block: ObjectId;
  mealPlan: ObjectId;
  status: StudentStatus;
  paidPayment: number;
  balancePayment: number;
  lastBilledMonth: string;
}

//type for student data after populating the mealPlan reference field : omits meal Plan and add mealPlan with IMealPlan as the type
export interface PopulatedStudent extends Omit<IStudent, "mealPlan"> {
  mealPlan: IMealPlan;
}

export type StudentStatus = "pending" | "resident" | "rejected" | "departed";

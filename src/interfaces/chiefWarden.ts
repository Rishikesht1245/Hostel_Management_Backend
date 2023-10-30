// Document is used to define the data structure for individual documents interface provided by mongo DB
import { Document } from "mongoose";
import { Interface } from "readline";

export interface IChiefWarden extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}

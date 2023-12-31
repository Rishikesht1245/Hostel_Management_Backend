import { ObjectId } from "mongoose";
import { IStudent } from "./student";

export interface IRoom {
  number: number;
  code: string;
  student: IStudent;
  occupiedOn: Date;
  availability: boolean;
}
export interface IBlock {
  _id: ObjectId;
  name: string;
  code: string;
  rooms: IRoom[];
  occupancy: number;
}

//  total number of rooms available and occupied in the hostel
export interface TotalRoomOccupancy {
  _id: null;
  occupancy: number;
  totalRooms: number;
  availableRooms: number;
}

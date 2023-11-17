import { Document, ObjectId } from "mongoose";

// user in chat
export interface userChat {
  role: string;
  socketId: string;
}

//Message
export interface ChatMessage {
  userId: string;
  userName: string;
  role: string;
  message: string;
  profilePic: string;
  date: number;
}

// Message for DB
export interface ChatDocument extends Document {
  userId: ObjectId;
  userName: string;
  role: string;
  message: string;
  profilePic: string;
  date: Date;
}

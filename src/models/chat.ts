import { Model, model, Schema } from "mongoose";
import { ChatDocument } from "../interfaces/chat";

export const chatSchema = new Schema<ChatDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "A message should have a sender Id"],
  },

  userName: {
    type: String,
    required: [true, "A message should have a sender name"],
  },
  role: {
    type: String,
    enum: {
      values: ["student", "staff"],
      message: "Invalid role ({VALUE})",
    },
  },
  message: {
    type: String,
    required: [true, "A chat must contain a message"],
  },
  date: {
    type: Date,
    required: [true, "A message must have a date"],
  },
  profilePic: {
    type: String,
  },
});

export const ChatModel: Model<ChatDocument> = model("Chat", chatSchema);

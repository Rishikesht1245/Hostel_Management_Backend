import { ChatDocument, ChatMessage } from "../interfaces/chat";
import { CRUD } from "./CRUD";
import { ChatModel } from "../models/chat";
import { Model } from "mongoose";

export class ChatRepo extends CRUD {
  model: Model<ChatDocument> = ChatModel;

  //   New message
  async createMessage(message: ChatMessage) {
    return await this.create(message);
  }

  // get messages by role
  async messageByRole(role: "student" | "staff"): Promise<ChatDocument[]> {
    return await this.findAll<ChatDocument>({ role });
  }
}

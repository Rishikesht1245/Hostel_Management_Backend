import ErrorResponses from "../errors/ErrorResponse";
import { ChatMessage, ChatDocument } from "../interfaces/chat";
import { ChatRepo } from "../repositories/chat";

export class ChatService extends ChatRepo {
  //  New message
  async newMessage(message: ChatMessage) {
    return await this.createMessage(message);
  }

  //   Get all messages
  async getAllMessages(role: "student" | "staff"): Promise<ChatDocument[]> {
    return await this.messageByRole(role);
  }
}

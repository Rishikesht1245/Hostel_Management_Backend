import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormatter } from "../../utils/jsonFormatter";
import { ChatService } from "../../services/chat";

const chatService = new ChatService();

// All staff chats
export const allChatMessages: RequestHandler = asyncHandler(
  async (req, res) => {
    const allChatMessages = await chatService.getAllMessages("staff");
    res.json(dataFormatter(allChatMessages));
  }
);

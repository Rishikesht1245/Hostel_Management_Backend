import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormatter } from "../../utils/jsonFormatter";
import { ChatService } from "../../services/chat";

const chatService = new ChatService();

// ALL chats by room (separate rooms for students and staffs)
export const allChatMessages: RequestHandler = asyncHandler(
  async (req, res) => {
    if (!/^(student|staff)$/.test(req.params.room)) req.params.room = "student";
    const allChatMessages = await chatService.getAllMessages(
      req.params.room as "student" | "staff"
    );
    res.json(dataFormatter(allChatMessages));
  }
);

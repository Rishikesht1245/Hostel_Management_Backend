import { UserChat, ChatMessage } from "../interfaces/chat";
import { io } from "../config/socket";
import { ChatService } from "../services/chat";

const chatService = new ChatService();

export const socketAPI = () => {
  //online users
  let users: UserChat[] = [];

  //   adding new user into users array
  const addUser = (role: string, socketId: string): void => {
    !users.some((user) => user.socketId !== socketId) &&
      users.push({ role, socketId });
  };

  //   remove user
  const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    // adding new user
    socket.on("join", (data) => {
      // role based chat (not individual chat)
      addUser(data.role, socket.id);
      // adding user to the room
      socket.join(data.role);
    });

    //     send a message
    socket.on(
      "sendMessage",
      async ({ role, message, userName, userId, profilePic }: ChatMessage) => {
        const messageData = {
          userId,
          userName,
          role,
          profilePic,
          message,
          date: Date.now(),
        };

        //saving message in DB
        await chatService.createMessage(messageData);

        //   sending message to the room
        io.to(role).emit("getMessage", messageData);
      }
    );

    //disconnect user
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

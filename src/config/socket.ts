import { Server } from "socket.io";

export const io = new Server({
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["POST", "GET"],
  },
});

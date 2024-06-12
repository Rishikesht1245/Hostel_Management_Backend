import { Server } from "socket.io";

export const io = new Server({
  cors: {
    origin: 'http://51.20.44.124:5173',
    methods: ["POST", "GET"],
  },
});

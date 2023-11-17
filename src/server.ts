import app from "./app";
import { io } from "./config/socket";
import { socketAPI } from "./utils/socketApi";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

// socket integration
io.attach(server);
socketAPI();

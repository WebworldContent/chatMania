import express from "express";
import { createServer } from "http";
import cors from "cors";
import userRoute from "./routes/user";
import { dbConnect } from "./dbConfig";
import helmet from "helmet";
import { PORT } from "./config";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import chatRoute from "./routes/chat";
import { protectSocket } from "./middleware/protectSocket";
import { save } from "./models/chat";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cookie: true,
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  },
});
dbConnect();

app.use(express.json());
app.use(cookieParser()); // parse cookie
app.use(helmet()); // Add security to headers
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // allowing cors request

app.use(userRoute);
app.use(chatRoute);

io.use(protectSocket);
//socket connection
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("one-to-one", async (userData) => {
    console.log("recieve chat data:", userData);
    try {
      const { email } = socket.data.user; // User data from middleware
      const { message } = userData;

      const savedChat = await save(email, message);
      socket.emit("message-saved", savedChat);
    } catch (error) {
      console.error("Error handling one-to-one message:", error);
      socket.emit("error", "Failed to save the message");
    }
  });

  // socket.on('join room', (room) => {
  //     console.log('Joined room ', room);
  // });

  socket.on("disconnect", (reason) => {
    console.log("Server is disconnected", reason);
  });
});

server.listen(PORT, () => {
  console.log(`Running on port : ${PORT}`);
});

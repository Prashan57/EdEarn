import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use("/", router);

const server = app.listen(9000, () => {
  console.log("listening at 9000");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined in room ${room}`);
    socket.on("message", (data) => {
      io.to(data.room).emit("message", data.message);
      console.log(data.message);
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

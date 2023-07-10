import { Server } from "socket.io";
import MessageManager from "./dao/dbManagers/messages.js";

const socket = {};
//let messages = [];

const messageManager = new MessageManager();

socket.connect = (httpServer) => {
  socket.io = new Server(httpServer);

  let { io } = socket;

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // When an user sends a message, it is added to the db
    socket.on("message", async (data) => {
      // messages.push(data);
      await messageManager.createMessage(data);
      let messages = await messageManager.getMessages();
      io.emit("messageLogs", messages);
    });

    socket.on("user-autenticated", async (data) => {
      let messages = await messageManager.getMessages();
      io.emit("messageLogs", messages);
      socket.broadcast.emit("user-connected", data);
    });
    socket.on("user-auth", async (user) => {
      if (user) {
        socket.broadcast.emit("user-connected", user);
      }
    });
  });
};

export default socket;
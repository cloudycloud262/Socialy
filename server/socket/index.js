import { createChat, createMessage } from "../controllers/chatController.js";
import { io } from "../index.js";

const socketToId = new Map();
const idToSocket = new Map();

export const socket = () => {
  io.on("connection", (socket) => {
    socket.on("add-user", (id) => {
      socketToId.set(socket.id, id);
      idToSocket.set(id, socket.id);
    });
    socket.on("send-message", async (messageObj, extraObj) => {
      socket
        .to(idToSocket.get(extraObj.receiverId))
        .emit("add-message", messageObj, { isNew: extraObj.isNew });
      if (extraObj.isNew) {
        await createChat({
          users: [messageObj.senderId, extraObj.receiverId],
          uuid: messageObj.chatId,
        });
      }
      await createMessage(messageObj);
    });
    socket.on("disconnect", () => {
      idToSocket.delete(socketToId.get(socket.id));
      socketToId.delete(socket.id);
    });
  });
};

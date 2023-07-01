import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { decodeJWT } from "./authController.js";

export const getChats = async (req, res) => {
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    let users = [];
    let chats = await Chat.find({ users: userId }).select("uuid users").sort({
      updatedAt: -1,
    });
    chats = chats.map((chat) => {
      const temp = chat.toObject();
      temp.userId =
        String(chat.users[0]) === String(userId)
          ? chat.users[1]
          : chat.users[0];
      users.push(temp.userId);
      delete temp.users;
      return temp;
    });
    users = await User.find({ _id: users }).select("username");
    const userMap = new Map();
    users.forEach((user) => {
      userMap.set(String(user._id), user.username);
    });
    chats.map((chat) => {
      chat.username = userMap.get(String(chat.userId));
      return chat;
    });
    console.log(chats);
    res.status(200).json(chats);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const getMessages = async (req, res) => {
  const { id } = req.params;

  try {
    const messages = await Message.find({ chatId: id }).select(
      "chatId senderId body"
    );
    res.status(200).json(messages);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const createChat = async (chatObj) => {
  try {
    await Chat.create(chatObj);
  } catch (e) {
    console.log(e);
  }
};

export const createMessage = async (messageObj) => {
  try {
    await Message.create(messageObj);
  } catch (e) {
    console.log(e);
  }
};

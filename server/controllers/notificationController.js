import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { decodeJWT } from "./authController.js";

export const getNotifications = async (req, res) => {
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    let notifications = await Notification.find({
      receiverId: userId,
    }).sort({
      createdAt: -1,
    });
    let usersId = new Set();
    notifications.forEach((n) => {
      usersId.add(n.senderId);
    });
    usersId = Array.from(usersId);
    const users = await User.find({ _id: usersId }).select("username");
    const usersMap = new Map();
    users.forEach((user) => {
      usersMap.set(String(user._id), user.username);
    });
    notifications = notifications.map((n) => {
      const temp = n.toObject();
      temp.username = usersMap.get(n.senderId);
      return temp;
    });
    res.status(200).json(notifications);
  } catch (e) {
    res.status(400).json(e);
  }
};

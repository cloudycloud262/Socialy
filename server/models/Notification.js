import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    contentId: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notification", notificationSchema);

export default Notification;

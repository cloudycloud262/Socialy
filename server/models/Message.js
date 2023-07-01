import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Please enter body"],
    },
    chatId: {
      type: String,
      required: [true, "Please enter chatId"],
    },
    senderId: {
      type: String,
      required: [true, "Please enter senderId"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;

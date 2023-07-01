import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: {
      type: [mongoose.ObjectId],
      required: [true, "Please enter users"],
    },
    uuid: {
      type: String,
      required: [true, "Please enter uuid"],
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);

export default Chat;

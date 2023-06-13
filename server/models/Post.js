import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Please write something before posting"],
      maxlength: [400, "Maximum Post length is 400 characters"],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;

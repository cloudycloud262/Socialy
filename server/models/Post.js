import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Please write something before posting"],
      maxlength: [400, "Maximum Post length is 400 characters"],
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [mongoose.ObjectId],
      default: [],
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { decodeJWT } from "./authController.js";

// handle errors
const handleErrors = (err) => {
  let errors = {};

  // validation errors
  if (err.message.includes("comment validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    let comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    let usersArr = new Set();
    comments.forEach((c) => {
      usersArr.add(c.userId);
    });
    usersArr = Array.from(usersArr);
    const users = await User.find({ _id: usersArr }).select("username");
    const usersMap = new Map();
    users.forEach((user) => {
      usersMap.set(String(user._id), user.username);
    });
    comments = comments.map((c) => {
      const temp = c.toObject();
      temp.username = usersMap.get(c.userId);
      return temp;
    });
    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const createComment = async (req, res) => {
  const body = req.body;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    const comment = await Comment.create({ ...body, userId });
    await Post.findByIdAndUpdate(body.postId, {
      $inc: { commentsCount: 1 },
    });
    res.status(200).json(comment._id);
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json(errors);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    const comment = await Comment.findById(id);
    if (comment.userId === userId) {
      await Comment.findByIdAndDelete(id);
      await Post.findByIdAndUpdate(comment.postId, {
        $inc: { commentsCount: -1 },
      });
      res.status(200).json(comment._id);
    } else {
      res.status(400).json("You can't delete this comment");
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

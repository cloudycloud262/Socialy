import Post from "../models/Post.js";
import { decodeJWT } from "./authController.js";

// handle errors
const handleErrors = (err) => {
  let errors = {};

  // validation errors
  if (
    err.message.includes("post validation failed") ||
    err.message.includes("Validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const createPost = async (req, res) => {
  const body = req.body;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    const post = await Post.create({ ...body, userId });
    res.status(200).json(post._id);
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json(errors);
  }
};

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const updatePost = async (req, res) => {
  const body = req.body;
  const token = req.cookies.jwt;
  const { id } = req.params;

  try {
    const userId = await decodeJWT(token);
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await Post.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(post._id);
    } else {
      res.status(400).json("You can't modify this post");
    }
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json(errors);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await Post.findByIdAndDelete(id);
      res.status(200).json(post._id);
    } else {
      res.status(400).json("You can't delete this post");
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

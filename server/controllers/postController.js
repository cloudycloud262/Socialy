import Post from "../models/Post.js";
import User from "../models/User.js";
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
  let query = req.query;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    let posts;
    if (query.userId) {
      posts = await Post.find(query).sort({ $natural: -1 });
      const username = (await User.findById(query.userId).select("username"))
        .username;
      posts = posts.map((post) => {
        const temp = post.toObject();
        temp["username"] = username;
        return temp;
      });
    } else if (query.page) {
      if (query.page === "home") {
        const user = await User.findById(userId).select("following");
        query.userId = user.following;
        delete query.page;
      } else if (query.page === "explore") {
        const user = await User.findById(userId).select("following");
        query.userId = { $nin: [...user.following, userId] };
        delete query.page;
      }
      posts = await Post.find(query).sort({ $natural: -1 });
      let userArr = new Set();
      posts.map((post) => {
        userArr.add(post.userId);
      });
      userArr = Array.from(userArr);
      const users = await User.find({ _id: userArr }).select("username");
      const usersMap = new Map();
      users.forEach((user) => {
        usersMap.set(String(user._id), user.username);
      });
      posts = posts.map((post) => {
        const temp = post.toObject();
        temp["username"] = usersMap.get(post.userId);
        return temp;
      });
    }
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
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

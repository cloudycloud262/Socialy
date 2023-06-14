import User from "../models/User.js";
import { decodeJWT } from "./authController.js";

export const getUsers = async (req, res) => {
  const query = {};

  try {
    if (req.query.type === "Search") {
      query.username = { $regex: `${req.query.username}`, $options: "i" };
    } else if (req.query.type === "Followers") {
      query._id = (
        await User.findById(req.query.id).select("followers")
      ).followers;
    } else if (req.query.type === "Following") {
      query._id = (
        await User.findById(req.query.id).select("following")
      ).following;
    }
    const users = await User.find(query).select("username");
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    let user = await User.findById(id).select(
      "username followersCount followingCount followers"
    );
    user = user.toObject();
    user["isFollowing"] = Boolean(
      user.followers.find((f) => String(f) === userId)
    );
    delete user.followers;
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const follow = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    await User.findByIdAndUpdate(id, {
      $push: { followers: userId },
      $inc: { followersCount: 1 },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { following: id },
      $inc: { followingCount: 1 },
    });
    res.status(200).json(userId);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const unFollow = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    await User.findByIdAndUpdate(id, {
      $pull: { followers: userId },
      $inc: { followersCount: -1 },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { following: id },
      $inc: { followingCount: -1 },
    });
    res.status(200).json(userId);
  } catch (e) {
    res.status(400).json(e);
  }
};

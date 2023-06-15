import User from "../models/User.js";
import { decodeJWT } from "./authController.js";

export const getUsers = async (req, res) => {
  const query = {};
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
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
    } else if (req.query.type === "SentRequest") {
      query._id = (await User.findById(userId).select("sentReq"))?.sentReq;
    } else if (req.query.type === "ReceivedRequest") {
      query._id = (
        await User.findById(userId).select("receivedReq")
      )?.receivedReq;
    }
    const users = await User.find(query).select("username");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    const temp = await User.findById(id).select(
      "username email followersCount followingCount followers isPrivate receivedReq postsCount"
    );
    const user = temp.toObject();
    user["isFollowing"] = temp.followers.includes(userId);
    if (!user["isFollowing"]) {
      user["isRequested"] = temp.receivedReq.includes(userId);
    }
    delete user.followers;
    delete user.receivedReq;
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
    const user = await User.findById(id).select("isPrivate");
    if (user.isPrivate) {
      await User.findByIdAndUpdate(id, {
        $push: { receivedReq: userId },
      });
      await User.findByIdAndUpdate(userId, {
        $push: { sentReq: id },
      });
    } else {
      await User.findByIdAndUpdate(id, {
        $push: { followers: userId },
        $inc: { followersCount: 1 },
      });
      await User.findByIdAndUpdate(userId, {
        $push: { following: id },
        $inc: { followingCount: 1 },
      });
    }
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

export const acceptRequest = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    await User.findByIdAndUpdate(id, {
      $push: { following: userId },
      $inc: { followingCount: 1 },
      $pull: { sentReq: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { followers: id },
      $inc: { followersCount: 1 },
      $pull: { receivedReq: id },
    });
    res.status(200).json(id);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const declineRequest = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    await User.findByIdAndUpdate(id, {
      $pull: { sentReq: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { receivedReq: id },
    });
    res.status(200).json(id);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const removeRequest = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    await User.findByIdAndUpdate(id, {
      $pull: { receivedReq: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { sentReq: id },
    });
    res.status(200).json(id);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const setPrivacy = async (req, res) => {
  const { status } = req.body;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    await User.findByIdAndUpdate(userId, { isPrivate: status });
    res.status(200).json(userId);
  } catch (e) {
    res.status(400).json(e);
  }
};

import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const query = {};

  try {
    if (req.query.type === "search") {
      query.username = { $regex: `${req.query.username}`, $options: "i" };
    }
    const users = await User.find(query).select("username");
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
};

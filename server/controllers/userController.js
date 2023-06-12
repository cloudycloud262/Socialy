import User from "../models/User.js";
import jwt from "jsonwebtoken";

// handle errors
const handleErrors = (err) => {
  let errors = {};

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Email is not registered";
  }
  // incorrect username
  if (err.message === "incorrect username") {
    errors.email = "Username is not registered";
  }
  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Incorrect Password";
  }

  // duplicate email or username error
  if (err.code === 11000) {
    if (err.keyValue.email) errors.email = "Email is already registered";
    if (err.keyValue.username)
      errors.username = "Username is already registered";
  }
  // validation errors
  if (
    err.message.includes("user validation failed") ||
    err.message.includes("Validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

export const decodeJWT = async (token) => {
  if (token) {
    try {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      return id;
    } catch (e) {
      throw Error("Invalid JWT");
    }
  } else {
    throw Error("Token is Empty");
  }
};

export const signup = async (req, res) => {
  const body = req.body;

  try {
    const user = await User.create(body);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(user._id);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(user._id);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

export const logout = (_req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json("Logout Successfully");
};

export const getCurrentUser = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const userId = await decodeJWT(token);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json("User doesn't exist");
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const updateProfile = async (req, res) => {
  const body = req.body;
  const token = req.cookies.jwt;

  try {
    const userId = await decodeJWT(token);
    const user = await User.findByIdAndUpdate(userId, body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json(user._id);
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);
    res.status(400).json(errors);
  }
};

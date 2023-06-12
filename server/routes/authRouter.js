import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/getCurrentUser", getCurrentUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.patch("/update", updateProfile);

export default userRouter;

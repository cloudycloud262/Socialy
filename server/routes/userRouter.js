import { Router } from "express";
import {
  currentUser,
  login,
  logout,
  signup,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/currentuser", currentUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;

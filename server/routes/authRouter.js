import { Router } from "express";
import {
  deleteAccount,
  getCurrentUser,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/getCurrentUser", getCurrentUser);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.patch("/update", updateProfile);
authRouter.delete("/delete", deleteAccount);

export default authRouter;

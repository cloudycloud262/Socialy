import { Router } from "express";
import {
  getUsers,
  getUser,
  follow,
  unFollow,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id/follow", follow);
userRouter.patch("/:id/unfollow", unFollow);

export default userRouter;

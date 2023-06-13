import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const postRouter = Router();

postRouter.post("/", createPost);
postRouter.get("/", getPosts);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;

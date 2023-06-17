import { Router } from "express";
import { getNotifications } from "../controllers/notificationController.js";

const notificationRouter = Router();

notificationRouter.get("/", getNotifications);

export default notificationRouter;

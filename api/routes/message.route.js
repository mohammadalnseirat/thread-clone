import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { sendMessage_Post } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage_Post);

export default router;

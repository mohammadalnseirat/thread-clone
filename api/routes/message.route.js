import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getAllConversations_Get,
  getAllMessages_Get,
  sendMessage_Post,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", protectRoute, getAllConversations_Get);
router.post("/", protectRoute, sendMessage_Post);
router.get("/:otheruserId", protectRoute, getAllMessages_Get);

export default router;

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost_Post,
  deletePost_Delete,
  getPost_Get,
  likeUnLikePost_Post,
} from "../controllers/post.controller.js";

const router = express.Router();
router.get("/:id", getPost_Get);
router.post("/createpost", protectRoute, createPost_Post);
router.post("/likeunlikepost/:id", protectRoute, likeUnLikePost_Post);
router.delete("/deletepost/:id", protectRoute, deletePost_Delete);

export default router;

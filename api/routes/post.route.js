import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost_Post,
  deletePost_Delete,
  getFeedPosts,
  getPost_Get,
  likeUnLikePost_Post,
  replyPost_Post,
} from "../controllers/post.controller.js";

const router = express.Router();
router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost_Get);
router.post("/createpost", protectRoute, createPost_Post);
router.put("/likeunlikepost/:id", protectRoute, likeUnLikePost_Post); //!toggle state (like/unlike) post
router.put("/replypost/:id", protectRoute, replyPost_Post);
router.delete("/deletepost/:id", protectRoute, deletePost_Delete);

export default router;

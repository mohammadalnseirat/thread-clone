import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost_Post,
  deletePost_Delete,
  getPost_Get,
} from "../controllers/post.controller.js";

const router = express.Router();
router.get("/:id", getPost_Get);
router.post("/createpost", protectRoute, createPost_Post);
router.delete("/deletepost/:id", protectRoute, deletePost_Delete);

export default router;

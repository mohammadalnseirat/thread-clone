import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost_Post,
  getPost_Get,
} from "../controllers/post.controller.js";

const router = express.Router();
router.get("/:id", getPost_Get);
router.post("/createpost", protectRoute, createPost_Post);

export default router;

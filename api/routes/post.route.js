import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost_Post } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost", protectRoute, createPost_Post);

export default router;

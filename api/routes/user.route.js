import express from "express";
import {
  followUnFollow_Post,
  logOut_Post,
  signIn_Post,
  signUp_Post,
  test_get,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/test", test_get);
router.post("/signup", signUp_Post);
router.post("/signin", signIn_Post);
router.post("/logout", logOut_Post);
router.post("/follow/:id", protectRoute, followUnFollow_Post); // toggle the state (follow/unfollow) user

export default router;

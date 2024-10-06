import express from "express";
import {
  logOut_Post,
  signIn_Post,
  signUp_Post,
  test_get,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test_get);
router.post("/signup", signUp_Post);
router.post("/signin", signIn_Post);
router.post("/logout", logOut_Post);

export default router;

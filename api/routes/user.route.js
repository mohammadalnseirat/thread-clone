import express from "express";
import { signUp_Post, test_get } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test_get);
router.post("/signup", signUp_Post);

export default router;

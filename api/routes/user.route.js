import express from "express";
import { test_get } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test_get);

export default router;

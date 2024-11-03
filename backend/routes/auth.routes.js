import express from "express";
import { signin, signup, getAllUsers, getUserProfile, updateUserProfile } from "../controller/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", requireAuth, getAllUsers);
router.get("/profile", requireAuth, getUserProfile);
router.put("/update", requireAuth, updateUserProfile);


export default router;

import express, { Router } from "express";
import { stest } from "../controllers/user";
import { signIn, signUp } from "../controllers/auth";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

// router.post("/google");

export default router;

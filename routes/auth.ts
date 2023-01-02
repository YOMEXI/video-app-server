import express, { Router } from "express";

import { googleAuth, signIn, signUp } from "../controllers/auth";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.post("/googleLogin", googleAuth);

export default router;

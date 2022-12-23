import express, { Router } from "express";
import { stest } from "../controllers/user";

const router: Router = express.Router();

router.get("/test", stest);

export default router;

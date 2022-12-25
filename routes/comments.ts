import express, { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
import { addComment, deleteComment, getComment } from "../controllers/comments";

const router: Router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", verifyToken, getComment);

export default router;

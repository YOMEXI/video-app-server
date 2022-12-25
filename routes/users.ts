import express, { Router } from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribe,
  unSubscribe,
  updateUser,
} from "../controllers/user";
import { verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.get("/find/:id", getUser);

router.delete("/:id", verifyToken, deleteUser);
router.put("/sub/:id", verifyToken, subscribe);
router.put("/unsub/:id", verifyToken, unSubscribe);
router.put("/like/:videoId", verifyToken, likeVideo);
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;

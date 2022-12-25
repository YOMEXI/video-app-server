import express, { Router } from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideo,
  subscribedVideo,
  trend,
  updateVideo,
} from "../controllers/videos";
import { verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", verifyToken, getVideo);

router.put("/view/:id", addView);
router.get("/random", randomVideo);
router.get("/sub", verifyToken, subscribedVideo);
router.get("/trend", trend);

export default router;

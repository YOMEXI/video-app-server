import express, { Router } from "express";
import {
  Search,
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideo,
  subscribedVideo,
  trend,
  updateVideo,
  videoByTags,
} from "../controllers/videos";
import { verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

router.post("/add", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);

router.put("/view/:id", addView);
router.get("/random", randomVideo);
router.get("/sub", verifyToken, subscribedVideo);
router.get("/trend", trend);
router.get("/tags", videoByTags);
router.get("/search", Search);

export default router;

import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../utils/@types";
import asyncHandler from "express-async-handler";
import Comment from "../model/Comment";
import Video from "../model/Video";

export const addComment = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });

    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  }
);

export const getComment = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const Comments = await Comment.find({
      videoId: req.params.videoId,
    });
    res.status(200).json(Comments);
  }
);

export const deleteComment = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const comment = await Comment.findById(req.params.id);

    const video = await Video.findById(req.params.id);

    if (req.user.id === comment?.userId || req.user.id === video?.userId) {
      await Comment.findByIdAndDelete(req.params.id);

      res.status(200).json("The comment has been deleted");
    } else {
      res.status(401);
      throw new Error("You can delete only your comment");
    }
  }
);

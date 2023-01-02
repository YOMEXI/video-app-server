import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IGetUserAuthInfoRequest } from "../utils/@types";
import User from "../model/User";
import Video from "../model/Video";

export const updateUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (req.params.id === req.user.id) {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updateUser);
    } else {
      res.status(401);
      throw new Error("You can update only your account");
    }
  }
);

export const deleteUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (req.params.id === req.user.id) {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User Has been Deleted");
    } else {
      res.status(401);
      throw new Error("You can Delete only your accounts");
    }
  }
);
export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  }
);

export const subscribe = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json("Subscription Successful");
  }
);
export const unSubscribe = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("Unsubscription Successful");
  }
);
export const likeVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    const check = await Video.findById(videoId);

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });

    res.status(200).json("Video has been liked");
  }
);
export const dislikeVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });

    res.status(200).json("Video has been disiked");
  }
);

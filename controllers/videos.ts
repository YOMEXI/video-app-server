import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Video from "../model/Video";
import { IGetUserAuthInfoRequest } from "../utils/@types";
import User from "../model/User";

export const addVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  }
);

export const updateVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const video = await Video.findById(req.params.id);

    if (!video) {
      res.status(401);
      throw new Error("Video not found");
    }

    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updateVideo);
    } else {
      res.status(401);
      throw new Error("UnAuthorized video access");
    }
  }
);

export const deleteVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const video = await Video.findById(req.params.id);

    if (!video) {
      res.status(401);
      throw new Error("Video not found");
    }

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);

      res.status(200).json("Video deleted");
    } else {
      res.status(401);
      throw new Error("UnAuthorized video access");
    }
  }
);

export const getVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  }
);

export const addView = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("Views increased");
  }
);

export const randomVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const videos = await Video.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(videos);
  }
);

export const trend = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  }
);

export const subscribedVideo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user?.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels?.map((channelId) => {
        return Video.find({ userId: channelId });
      }) ?? []
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  }
);

export const videoByTags = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const tags = req.query.tags;

    const videos = await Video.find({ tags: { $in: tags } }).limit(10);
    res.status(200).json(videos);
  }
);

export const Search = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const query = req.query.q;

    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json(videos);
  }
);

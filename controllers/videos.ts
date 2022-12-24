import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const addVideo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

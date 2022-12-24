import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IGetUserAuthInfoRequest } from "./@types";

export const verifyToken = asyncHandler(
  (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
      res.status(401);
      throw new Error("UnAuthorized error, access denied");
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
      if (err) {
        res.status(401);
        throw new Error("Token is not valid");
      }

      req.user = user;
      next();
    });
  }
);

import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//
import User, { IUser } from "../model/User";

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userExist = await User.findOne({ name: req.body.name });

    if (userExist) {
      res.status(404);
      throw new Error("User already exist");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    res.status(201).json({ msg: "User Created" });
    //   const newUser = new User();
  }
);

export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      res.status(404);
      throw new Error("User Does not exist");
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      res.status(401);
      throw new Error("Wrong credentials");
    }
    //   const newUser = new User();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(others)
      .status(200);
  }
);

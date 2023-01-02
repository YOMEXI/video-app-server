import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";

import userRoutes from "./routes/users";
import videoRoutes from "./routes/videos";
import commentRoutes from "./routes/comments";
import authRoutes from "./routes/auth";
import { errorhandler } from "./error/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/video", videoRoutes);
app.use(errorhandler);

//routes path

app.use("*", (req, res, next) => {
  const error = new Error(`The url ${req.originalUrl} doesnt exist`);

  res.status(404).json(error.message);
});
export { app };

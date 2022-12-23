import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
app.use(express.json());

import userRoutes from "./routes/users";
import videoRoutes from "./routes/comments";
import commentRoutes from "./routes/comments";
import authRoutes from "./routes/auth";
import { errorhandler } from "./error/errorHandler";

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);

app.use("/api/video", videoRoutes);
app.use(errorhandler);
//routes path

app.use("*", (req, res, next) => {
  const error = new Error(`The url ${req.originalUrl} doesnt exist`);
  res.status(404);
});
export { app };

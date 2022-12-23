import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//
import { app } from "./app";
dotenv.config();

const PORT: string | number = process.env.PORT || 8000;

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(PORT, () => {
  connect();
  console.log("Server running on port", PORT);
});

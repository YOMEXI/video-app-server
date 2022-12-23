import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  userId: string;
  desc: string;
  videoId: string;
}

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: String,
      require: true,
    },
    videoId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IComment>("Comment", commentSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
}

const VideoSchema = new Schema<IVideo>(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
    videoUrl: {
      type: String,
      require: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
    },
    dislikes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVideo>("Video", VideoSchema);

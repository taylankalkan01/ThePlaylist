import mongoose, { Document, ObjectId } from "mongoose";
import moment from "moment";

export interface Song extends Document {
  title: string;
  artist: ObjectId;
  duration: number;
  image: string;
  plays: number;
  createdAt: string;
  updatedAt: string;
}

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist"
    },
    duration: {
      type: Number
    },
    image: {
      type: String
    },
    plays: {
      type: Number
    },
    createdAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a")
    },
    updatedAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a")
    }
  },
  { versionKey: false, timestamps: true }
);

const Song = mongoose.model<Song>("Song", songSchema);

export default Song;

import mongoose, { Document, ObjectId } from "mongoose";
import moment from "moment";

export interface Playlist extends Document {
  name: string;
  songs: string;
  photo: Date;
  description: string;
  followers:ObjectId
  createdAt: string;
  updatedAt: string;
}

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
      }
    ],
    photo: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
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

const Playlist = mongoose.model<Playlist>("Playlist", playlistSchema);

export default Playlist;

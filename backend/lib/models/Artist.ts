import mongoose, { Document, ObjectId } from "mongoose";
import moment from "moment";

export interface Artist extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  bio: string;
  followers: ObjectId;
  albums: ObjectId;
  songs: ObjectId;
  monthlyListeners: number;
  createdAt: string;
  updatedAt: string;
}

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
      }
    ],
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
      }
    ],
    monthlyListeners: {
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

const Artist = mongoose.model<Artist>("Artist", artistSchema);

export default Artist;

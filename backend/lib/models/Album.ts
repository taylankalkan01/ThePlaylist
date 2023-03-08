import mongoose, { Document, ObjectId } from "mongoose";
import moment from "moment";

export interface Album extends Document {
  name: string;
  image: string;
  releaseYear: string;
  songs: ObjectId;
  artist: ObjectId;
  createdAt: string;
  updatedAt: string;
}

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    releaseYear: {
      type: String,
      required: true
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
      }
    ],
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist"
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

const Album = mongoose.model<Album>("Album", albumSchema);

export default Album;

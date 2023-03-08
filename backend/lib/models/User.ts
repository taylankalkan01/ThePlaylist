import mongoose, { Document, ObjectId } from "mongoose";
import moment from "moment";

export interface User extends Document {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  password: string;
  phone: string;
  membership: ObjectId;
  followers: ObjectId;
  followings: ObjectId;
  playlists: ObjectId;
  membershipStartDate: Date;
  membershipEndDate: Date;
  isAdmin: Boolean;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
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
    phone: {
      type: String,
      required: false
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan"
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
      }
    ],
    membershipStartDate: {
      type: Date
    },
    membershipEndDate: {
      type: Date
    },
    isAdmin: {
      default: false
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

const User = mongoose.model<User>("User", userSchema);

export default User;

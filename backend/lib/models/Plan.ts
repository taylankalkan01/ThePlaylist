import mongoose, { Document, ObjectId } from "mongoose";
import moment from "moment";

export interface Plan extends Document {
  isActive: boolean;
  planType: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

const planSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: false,
      required: true
    },
    planType: {
      type: String, //free-premium
      required: true
    },
    price: {
      type: String, //free(0)-premium($30)
      required: true
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

const Plan = mongoose.model<Plan>("Plan", planSchema);

export default Plan;

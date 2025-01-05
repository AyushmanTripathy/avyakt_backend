import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  memberCount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["UPCOMING", "ONGOING", "CLOSED"],
      message: "{VALUE} is not supported",
    },
  },
  fee: { type: Number, required: true },
  rules: { type: [String], required: true },
  category: {
    type: String,
    required: true,
    enum: {
      values: ["TECH", "NONTECH", "CULTURAL", "SPORTS", "SPECIAL"],
      message: "{VALUE} is not supported",
    },
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["ALL", "BOYS", "GIRLS"],
      message: "{VALUE} is not supported",
    },
  },
  imageURL: { type: String, required: true },
});

export default mongoose.model("Event", eventSchema);

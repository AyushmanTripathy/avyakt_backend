import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  memberCount: { type: Number, required: true },
  status: { type: String, required: true },
  fee: { type: Number, required: true },
  rules: { type: [String], required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  imageURL: { type: String, required: true },
});

export default mongoose.model("Event", eventSchema);

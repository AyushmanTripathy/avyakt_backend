import mongoose from "mongoose";
const ObjectId = mongoose.SchemaTypes.ObjectId;

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mails: { type: [String], required: true },
  eventId: { type: ObjectId, required: true },
  phoneno: { type: Number, required: true },
  upiId: { type: String },
});

export default mongoose.model("Registration", registrationSchema);

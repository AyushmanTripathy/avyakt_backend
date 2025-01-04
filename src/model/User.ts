import mongoose from "mongoose";
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    index: {
      unique: true,
      sparse: true,
    },
  },
  registrations: { type: [ObjectId], required: true },
});

export default mongoose.model("User", userSchema);

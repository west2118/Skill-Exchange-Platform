import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    location: {
      zip: { type: String },
      address: { type: String },
    },
    offeredSkills: { type: [String] },
    seekedSkills: { type: [String] },
    reviews: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;

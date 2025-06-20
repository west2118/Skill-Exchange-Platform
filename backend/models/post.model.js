import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillSeek: { type: String, required: true },
    skillOffer: { type: String, required: true },
    description: { type: String, required: true },
    availTimeFrom: { type: String, required: true },
    availTimeTo: { type: String, required: true },
    preferredTime: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "Pending" },
    matchedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;

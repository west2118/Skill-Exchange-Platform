import mongoose from "mongoose";

const ExchangeSchema = mongoose.Schema(
  {
    proposerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    skillOffer: { type: String, required: true },
    skillSeek: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Exchange = mongoose.model("Exchange", ExchangeSchema);

export default Exchange;

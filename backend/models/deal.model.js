import mongoose from "mongoose";

const DealSchema = mongoose.Schema(
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
    exchangeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exchange",
      required: true,
    },
    skillOffer: { type: String, required: true },
    skillSeek: { type: String, required: true },
    status: { type: String, default: "Upcoming" },
    sessions: [
      {
        date: { type: String },
        startTime: { type: Number },
        endTime: { type: Number },
        location: { type: String },
        address: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", DealSchema);

export default Deal;

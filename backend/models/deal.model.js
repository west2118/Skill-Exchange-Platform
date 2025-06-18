import mongoose from "mongoose";

const SessionSchema = mongoose.Schema(
  {
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    location: { type: String },
    address: { type: String },
  },
  { _id: false }
);

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
    sessions: [SessionSchema],
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", DealSchema);

export default Deal;

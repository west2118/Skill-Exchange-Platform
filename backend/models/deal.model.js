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
    ratings: {
      proposerRated: {
        hasRated: { type: Boolean, default: false },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        rating: { type: Number, default: 0 },
        review: { type: String, default: "" },
      },
      receiverRated: {
        hasRated: { type: Boolean, default: false },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        rating: { type: Number, default: 0 },
        review: { type: String, default: "" },
      },
    },
    isCancelled: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reason: { type: String },
      description: { type: String },
      cancelledAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", DealSchema);

export default Deal;

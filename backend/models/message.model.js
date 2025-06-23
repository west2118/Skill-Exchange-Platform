import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    senderId: { type: String, required: true }, // 🔄 changed from ObjectId
    receiverId: { type: String, required: true },
    roomId: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;

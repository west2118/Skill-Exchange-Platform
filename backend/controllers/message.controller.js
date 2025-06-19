import { getReceiverSocketId } from "../lib/socket";
import Message from "../models/message.model";

const sendMessage = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    const { text, image, receiverId } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Message text or image is required" });
    }

    let imageUrl;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }

    const roomId = [senderId, receiverId].sort().join("_");

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      roomId,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { sendMessage };

import { getReceiverSocketId } from "../lib/socket.js";
import Deal from "../models/deal.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../server.js";

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

    console.log("🔍 Receiver ID:", receiverId);
    console.log("📡 Receiver Socket ID:", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsersSidebar = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User didn't exist" });
    }

    const deals = await Deal.find({
      $or: [{ proposerId: id }, { receiverId: id }],
    });

    const otherUserIds = deals.map((deal) =>
      deal.proposerId.toString() === id.toString()
        ? deal.receiverId.toString()
        : deal.proposerId.toString()
    );

    const uniqueUserIds = [...new Set(otherUserIds)];

    const sideBarUsers = await User.find({ _id: { $in: uniqueUserIds } });

    res.status(200).json(sideBarUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const messages = await Message.find({ roomId: id }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { sendMessage, getUsersSidebar, getMessage };

import { Server } from "socket.io";
import admin from "firebase-admin";

export const onlineUsers = new Map();

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New socket connected:", socket.id);

    socket.on("authenticate", async (data) => {
      try {
        if (!data || !data.token) {
          console.warn("⚠️ No token received in authenticate");
          return socket.disconnect();
        }

        const decoded = await admin.auth().verifyIdToken(data.token);
        const userId = decoded.uid;

        socket.data.userId = userId;

        console.log("✅ Set socket ID for user:", userId, "➡", socket.id);

        onlineUsers.set(userId, socket.id);

        console.log(`✅ User authenticated: ${userId}`);
      } catch (err) {
        console.error("❌ Firebase token error:", err.message);
        socket.disconnect(); // safely disconnect if auth fails
      }
    });

    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`🔌 User disconnected: ${userId}`);
      } else {
        console.log("🔌 Socket disconnected (no user ID)");
      }
    });
  });

  return io;
};

export const getReceiverSocketId = (userId) => onlineUsers.get(userId);

import { Server } from "socket.io";
import jwt from "jsonwebtoken";

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
    socket.on("authenticate", async () => {
      try {
        const cookies = socket.request.headers.cookie;
        if (!cookies) {
          console.warn("⚠️ No cookies received in authenticate");
          return socket.disconnect();
        }

        const cookieString = cookies.split('; ').find(row => row.startsWith('token='));
        const token = cookieString ? cookieString.split('=')[1] : null;

        if (!token) {
          console.warn("⚠️ No token found in cookies");
          return socket.disconnect();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "fallback_secret");
        const userId = decoded.id;

        socket.data.userId = userId;

        onlineUsers.set(userId, socket.id);
      } catch (err) {
        console.error("❌ JWT token error:", err.message);
        socket.disconnect(); // safely disconnect if auth fails
      }
    });

    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      if (userId) {
        onlineUsers.delete(userId);
      }
    });
  });

  return io;
};

export const getReceiverSocketId = (userId) => onlineUsers.get(userId);

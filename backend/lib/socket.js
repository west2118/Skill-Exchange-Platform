import { Server } from "socket.io";
import admin from "firebase-admin";

const onlineUsers = new Map();

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("No auth token"));

    try {
      const decoded = await admin.auth().verifyIdToken(token);
      socket.data.userId = decoded.uid;
      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    onlineUsers.set(userId, socket.id);

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
    });
  });

  return io;
};

export const getReceiverSocketId = (userId) => onlineUsers.get(userId);

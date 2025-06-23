import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket && socket.connected) return;

  socket = io("http://localhost:8080", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ Connected:", socket?.id);
    // 🔐 Authenticate AFTER connection
    socket?.emit("authenticate", { token });
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });
};

export const getSocket = () => socket;

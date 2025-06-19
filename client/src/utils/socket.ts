import io from "socket.io-client";

let socket: ReturnType<typeof io> | null = null; // ✅ Let TypeScript infer the type

export const connectSocket = (token: string) => {
  socket = io("http://localhost:8080", {
    auth: { token },
  });
};

export const getSocket = () => socket;

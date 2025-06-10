import axios from "axios";

// 1. Public API (no cookies needed)
export const publicApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// 2. Private API (sends cookies)
export const privateApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Sends HttpOnly cookies
  headers: { "Content-Type": "application/json" },
});

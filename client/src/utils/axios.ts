import axios from "axios";

// Base instance
export const publicApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor to handle token refresh
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await publicApi.post("/refresh-session");
        return privateApi(originalRequest);
      } catch (err) {
        // Refresh failed, user is actually logged out
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

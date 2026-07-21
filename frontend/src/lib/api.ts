import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const AUTH_STORAGE_KEY = "astarsquad-auth";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      if (location.pathname.startsWith("/admin") && location.pathname !== "/admin/login") {
        location.assign("/admin/login");
      }
    }
    return Promise.reject(error);
  },
);

export { AUTH_STORAGE_KEY };

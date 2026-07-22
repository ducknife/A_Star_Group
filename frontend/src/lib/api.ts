import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  // The JWT lives in an HttpOnly cookie set by the backend — the browser attaches it
  // automatically, so no Authorization header is set from JS-readable storage.
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin/login"
    ) {
      location.assign("/admin/login");
    }
    return Promise.reject(error);
  },
);

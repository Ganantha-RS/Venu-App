import axios from "axios";

// Sesuaikan VITE_API_BASE_URL di file .env, contoh: http://localhost:8000/api/v1
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: "application/json" },
});

// Sisipkan token Sanctum otomatis kalau user sudah login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("venu_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

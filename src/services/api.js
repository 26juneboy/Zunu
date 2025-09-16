import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://stage.zunuspaces.com:443/api/v1/interio",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (e.g., add auth token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

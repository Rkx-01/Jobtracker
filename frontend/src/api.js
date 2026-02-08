import axios from "axios";

// Use Render backend URL in production, localhost in development
const API = axios.create({
    baseURL: import.meta.env.PROD
        ? "https://jobtracker-backend-nh5g.onrender.com"
        : "http://localhost:3000",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

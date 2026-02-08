import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.PROD
        ? "https://jobtracker-backend-nh5g.onrender.com"
        : "http://localhost:3000",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

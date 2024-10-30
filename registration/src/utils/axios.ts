import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
const customAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Note: This header is usually set by the server, not the client
  },
});

customAxios.defaults.withCredentials = true;

customAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Authorization header with Bearer token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;

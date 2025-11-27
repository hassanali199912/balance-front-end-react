import axios, { AxiosError, type AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://balancerealestate.runasp.net/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                console.error("Error From Interceptor", error);
                // localStorage.removeItem("access_token");
                // window.location.href = "/auth/login"; // redirect
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

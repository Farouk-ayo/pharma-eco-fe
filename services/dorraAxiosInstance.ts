import { DORRA_API_CONFIG } from "@/lib/api/config";
import axios from "axios";
import Cookies from "js-cookie";

const dorraAxiosInstance = axios.create({
  baseURL: DORRA_API_CONFIG.baseURL,
  headers: DORRA_API_CONFIG.headers,
});

// Request interceptor
dorraAxiosInstance.interceptors.request.use(
  (config) => {
    const emrToken = Cookies.get("emrAuthToken");
    if (emrToken) {
      config.headers.Authorization = `Token ${DORRA_API_CONFIG.apiKey}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
dorraAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("emrAuthToken");
      window.location.href = "/pharmaeco-guard/signin";
    }
    return Promise.reject(error);
  }
);

export default dorraAxiosInstance;

import axios from "axios";
import ENV from "./env.config";
import { getAccessToken } from "./utils/access-token";

const AxiosInstance = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 3000,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;

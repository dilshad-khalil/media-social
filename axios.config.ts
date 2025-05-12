import axios from "axios";
import ENV from "./env.config";

const AxiosInstance = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 3000,
});

export default AxiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fake-product-api-json-server.vercel.app",
});

export default axiosInstance;

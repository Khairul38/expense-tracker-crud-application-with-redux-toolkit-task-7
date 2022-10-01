import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fake--json-server.herokuapp.com",
});

export default axiosInstance;

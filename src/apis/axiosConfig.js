import axios from "axios";

const api = axios.create({
  baseURL: "https://carebridgebackend1.onrender.com",
});

export default api;

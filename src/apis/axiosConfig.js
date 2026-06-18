import axios from "axios";

const api = axios.create({
  baseURL: "https://carebridgebackend-urxs.onrender.com",
});

export default api;

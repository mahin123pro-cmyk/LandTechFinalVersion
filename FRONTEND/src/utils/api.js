
import axios from "axios";
// import.meta.env.VITE_API_URL ||
export const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL||"http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


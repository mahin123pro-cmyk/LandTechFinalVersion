import axios from "axios";

const API_URL ="http://192.168.0.105:5000"||"http://localhost:5000"|| import.meta.env.VITE_API_URL ;

export const api = axios.create({
baseURL: API_URL,
withCredentials: true
});
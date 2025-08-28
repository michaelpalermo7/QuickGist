import axios from "axios";

const isProd = import.meta.env.PROD;

const baseURL = isProd
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

if (isProd && !baseURL) {
  console.error("Missing VITE_API_BASE_URL in production build!");
}

//ends in api
export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

console.log("API baseURL =", baseURL);

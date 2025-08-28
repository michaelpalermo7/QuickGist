import axios from "axios";

const isProd = import.meta.env.PROD;
const baseURL = isProd
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

if (isProd && !baseURL)
  throw new Error("VITE_API_BASE_URL missing in production build");

console.log("API baseURL =", baseURL);

export const api = axios.create({
  baseURL, // now points to just the root domain
  headers: { "Content-Type": "application/json" },
});

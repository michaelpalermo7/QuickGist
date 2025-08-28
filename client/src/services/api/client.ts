import axios from "axios";

/**
 * Preconfigured Axios instance so all API calls share base URL and headers.
 * Avoids repeating config in every request.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

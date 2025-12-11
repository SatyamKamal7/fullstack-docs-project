import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_BASE_LOCAL
    : import.meta.env.VITE_API_BASE_PROD;

export const api = axios.create({ baseURL });
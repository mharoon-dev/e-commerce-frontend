import axios from "axios";
import { BASE_URL } from "./utils/urls.jsx";

const TOKEN = JSON.parse(localStorage.getItem("token"));

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { token: `Bearer ${TOKEN}` },
});

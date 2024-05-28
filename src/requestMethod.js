import axios from "axios";
import { BASE_URL } from "./utils/urls.jsx";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTRhNDgxMTZkMjViNjExMjU2Zjg2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNjkyMDY4NywiZXhwIjoxNzE3MTc5ODg3fQ.m7OJkEda08nt5Lz-TlWEox9YLfV7qGvphd8lPVvsa2k";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { token: `Bearer ${TOKEN}` },
});

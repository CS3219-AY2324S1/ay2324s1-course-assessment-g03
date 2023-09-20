import axios from "axios";
import { API_URL } from "@/constants/api";

export const backendApi = axios.create({
  baseURL: API_URL,
});

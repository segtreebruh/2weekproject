import axios from "axios";
import type { RegisterRequest } from "@shared/types";

const baseUrl = '/api/register';

export const register = async (credentials: RegisterRequest) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}
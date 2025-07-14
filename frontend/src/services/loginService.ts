import axios from "axios";
import type { LoginRequest } from '@shared/types';

const baseUrl = "/api/login";

export const login = async (credentials: LoginRequest) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
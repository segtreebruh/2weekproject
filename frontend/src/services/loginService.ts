import axios from "axios";
import type { LoginRequest, LoginResponse } from '@shared/types';

const baseUrl = "/api/login";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

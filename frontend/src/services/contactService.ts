import axios from "axios";
import type { Contact } from '@shared/types';

const baseUrl = "/api/contacts";

export const getAll = async (token: string): Promise<Contact[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.get(baseUrl, config);
  return response.data;
};

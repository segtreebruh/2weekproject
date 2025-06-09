import axios from "axios";
import type { Contact } from '@shared/types';

const baseUrl = "/api/contacts";

let token: string;
export const setToken = (newToken: string) => {
  token = newToken;
}

export const getAll = async (): Promise<Contact[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await axios.get(baseUrl, config);
  return response.data;
};

export const deleteById = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  await axios.delete(baseUrl + `/${id}`, config);
}
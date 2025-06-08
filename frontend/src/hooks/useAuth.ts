import { useState, useEffect } from "react";
import axios from "axios";
import type { LoginRequest, Contact, LocalStorageJwt } from '@shared/types';

export function useAuth() {
  const [user, setUser] = useState<LocalStorageJwt | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (user !== null) {
      const contactUrl = "/api/contacts";
      const token = user.token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(contactUrl, config).then((response) => {
        setContacts(response.data.filter(
          (contact: Contact) => contact.belongsTo.username === user.username
        ));
      });
    }
  }, [user]);

  const handleLogin = async (username: string, password: string) => {
    const credentials: LoginRequest = {
      username,
      password,
    };

    return await handleLoginBackend(credentials);
  };

  const handleLoginBackend = async (credentials: LoginRequest) => {
    const baseUrl = "/api/login";

    try {
      const response = await axios.post(baseUrl, credentials);
      const userData = response.data;

      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  return {
    user,
    contacts,
    handleLogin
  };
}

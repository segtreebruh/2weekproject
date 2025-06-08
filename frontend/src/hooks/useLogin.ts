import { useState, useEffect } from "react";
import type { LoginRequest, Contact, LocalStorageJwt } from '@shared/types';
import * as loginService from '../services/loginService';
import * as contactService from '../services/contactService';

export function useLogin() {
  const [localStorageJwt, setLocalStorageJwt] = useState<LocalStorageJwt | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (localStorageJwt !== null) {
      contactService.getAll(localStorageJwt.token)
        .then(allContacts => {
          setContacts(allContacts.filter(
            (contact: Contact) => contact.belongsTo.username === localStorageJwt.username
          ));
        })
        .catch(error => {
          console.error("Failed to fetch contacts:", error);
        });
    }
  }, [localStorageJwt]);

  const handleLogin = async (username: string, password: string) => {
    const credentials: LoginRequest = {
      username,
      password,
    };

    return await handleLoginBackend(credentials);
  };

  const handleLoginBackend = async (credentials: LoginRequest) => {
    try {
      const userData = await loginService.login(credentials);
      setLocalStorageJwt(userData);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  return {
    user: localStorageJwt,
    contacts,
    handleLogin
  };
}

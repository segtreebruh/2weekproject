import { useState, useEffect } from "react";
import type { LoginRequest, Contact, LocalStorageJwt } from "@shared/types";
import * as loginService from "../services/loginService";
import * as contactService from "../services/contactService";

export function useLogin() {
  const [localStorageJwt, setLocalStorageJwt] =
    useState<LocalStorageJwt | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const localJwt = window.localStorage.getItem("JwtAccessToken");

    if (localJwt) {
      const jwtAccessToken = JSON.parse(localJwt);
      setLocalStorageJwt(jwtAccessToken);
      contactService.setToken(jwtAccessToken.token);
    }
  }, []);

  useEffect(() => {
    if (localStorageJwt !== null) {
      contactService
        .getAll()
        .then((allContacts) => {
          setContacts(
            allContacts.filter(
              (contact: Contact) =>
                contact.belongsTo.username === localStorageJwt.username
            )
          );
        })
        .catch((error) => {
          console.error("Failed to fetch contacts:", error);
        });
    }
  }, [localStorageJwt]);

  const handleLogin = async (username: string, password: string) => {
    const credentials: LoginRequest = {
      username,
      password,
    };

    try {
      const userData = await loginService.login(credentials);
      contactService.setToken(userData.token);
      setLocalStorageJwt(userData);
      window.localStorage.setItem(
        "JwtAccessToken",
        JSON.stringify(userData)
      );
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("JwtAccessToken");
    setLocalStorageJwt(null);
    setContacts([]);
  };

  return {
    localStorageJwt,
    contacts,
    handleLogin,
    handleLogout
  };
}

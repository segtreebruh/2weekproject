import { useState, useEffect } from "react";
import type { LoginRequest, Contact, JwtAccessToken } from "@shared/types";
import * as loginService from "../services/loginService";
import * as contactService from "../services/contactService";
import { useNotification } from "./useNotification";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

const isValidToken = (token: string): boolean => {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (typeof payload.exp !== "number") {
      return false;
    }
    return Date.now() / 1000 < payload.exp;
  } catch {
    return false;
  }
};

export function useLogin() {
  const [JwtAccessToken, setJwtAccessToken] =
    useState<JwtAccessToken | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    const localJwt = window.localStorage.getItem("JwtAccessToken");

    if (localJwt) {
      const jwtAccessToken = JSON.parse(localJwt);

      if (isValidToken(jwtAccessToken.token)) {
        setJwtAccessToken(jwtAccessToken);
        contactService.setToken(jwtAccessToken.token);
      } else {
        window.localStorage.removeItem("JwtAccessToken");
        setJwtAccessToken(null);
      }
    }
  }, []);

  useEffect(() => {
    if (JwtAccessToken !== null) {
      const getContacts = async () => {
        const allContacts = await contactService.getAll();
        setContacts(
          allContacts.filter(
            (contact: Contact) =>
              contact.belongsTo.username === JwtAccessToken.username
          )
        );
      };

      getContacts();
    }
  }, [JwtAccessToken]);

  const handleLogin = async (username: string, password: string) => {
    const credentials: LoginRequest = {
      username,
      password,
    };

    try {
      const userData = await loginService.login(credentials);
      contactService.setToken(userData.token);
      setJwtAccessToken(userData);
      window.localStorage.setItem("JwtAccessToken", JSON.stringify(userData));

      showNotification(`Welcome, ${userData.name}!`, "success");
      return true;
    } catch (error) {
      console.log("Login failed:", error);

      showNotification("Invalid credentials", "error");
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("JwtAccessToken");
    setJwtAccessToken(null);
    setContacts([]);
    contactService.setToken('');

    showNotification("Logged out", "success");
  };

  return {
    JwtAccessToken,
    contacts,
    handleLogin,
    handleLogout,
  };
}

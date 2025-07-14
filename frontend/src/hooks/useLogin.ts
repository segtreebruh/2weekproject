import { useState, useEffect } from "react";
import type { LoginRequest, Contact, JwtPayload } from "@shared/types";
import * as loginService from "../services/loginService";
import * as contactService from "../services/contactService";
import { useNotification } from "./useNotification";
import { jwtDecode } from "jwt-decode";

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
  const [jwt, setJwt] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { showNotification } = useNotification();

  const payload = jwt !== null 
    ? jwtDecode<JwtPayload>(jwt)
    : null;

  useEffect(() => {
    const jwtAccessToken = window.localStorage.getItem("JwtAccessToken");

    if (jwtAccessToken) {
      if (isValidToken(jwtAccessToken)) {
        setJwt(jwtAccessToken);
        contactService.setToken(jwtAccessToken);
      } else {
        window.localStorage.removeItem("JwtAccessToken");
        setJwt(null);
      }
    }
  }, []);

  useEffect(() => {
    if (payload !== null) {
      const getContacts = async () => {
        const allContacts = await contactService.getAll();

        setContacts(
          allContacts.filter(
            (contact: Contact) =>
              contact.belongsTo.username === payload.username
          )
        );
      };

      getContacts();
    }
  }, [payload]);

  const handleLogin = async (username: string, password: string) => {
    const credentials: LoginRequest = {
      username,
      password,
    };

    try {
      const response = await loginService.login(credentials);
      contactService.setToken(response.token);
      setJwt(response.token); 
      window.localStorage.setItem("JwtAccessToken", JSON.stringify(response.token));

      showNotification(`Welcome back!`, "success");
      return true;
    } catch (error) {
      console.log("Login failed:", error);

      showNotification("Invalid credentials", "error");
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("JwtAccessToken");
    setJwt(null);
    setContacts([]);
    contactService.setToken("");

    showNotification("Logged out", "success");
  };

  return {
    payload,
    contacts,
    handleLogin,
    handleLogout
  };
}

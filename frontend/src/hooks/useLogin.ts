import { useState, useEffect } from "react";
import type { LoginRequest, Contact, LocalStorageJwt } from "@shared/types";
import * as loginService from "../services/loginService";
import * as contactService from "../services/contactService";
import { useNotification } from "./useNotification";
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from "jwt-decode";

const isValidToken = (token: string): boolean => {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (typeof payload.exp !== 'number') {
      return false;
    }
    return Date.now() / 1000 < payload.exp;
  } catch {
    return false;
  }
};

export function useLogin() {
  const [localStorageJwt, setLocalStorageJwt] =
    useState<LocalStorageJwt | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { setNotification } = useNotification();

  useEffect(() => {
    const localJwt = window.localStorage.getItem("JwtAccessToken");

    if (localJwt) {
      const jwtAccessToken = JSON.parse(localJwt);

      if (isValidToken(jwtAccessToken.token)) {
        setLocalStorageJwt(jwtAccessToken);
        contactService.setToken(jwtAccessToken.token);
      }
      else {
        window.localStorage.removeItem("JwtAccessToken");
        setLocalStorageJwt(null);
      }
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
      window.localStorage.setItem("JwtAccessToken", JSON.stringify(userData));

      setNotification({
        msg: `Welcome, ${userData.name}!`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return true;
    } catch (error) {
      console.log("Login failed:", error);

      setNotification({
        msg: "Invalid credentials",
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("JwtAccessToken");
    setLocalStorageJwt(null);
    setContacts([]);

    setNotification({
      msg: "Logged out",
      type: "success",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return {
    localStorageJwt,
    contacts,
    handleLogin,
    handleLogout,
  };
}
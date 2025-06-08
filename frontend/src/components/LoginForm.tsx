import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LocalStorageJwt } from "@shared/types";

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
  handleLogout?: () => void;
  localStorageJwt: LocalStorageJwt | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin,
  handleLogout,
  localStorageJwt,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  const registerRedirect = () => {
    navigate("/register");
  };

  return (
    <>
      {localStorageJwt ? (
        <div>
          <p>Logged in as {localStorageJwt.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={(registerRedirect)}>Register</button>
        </>
      )}
    </>
  );
};

export default LoginForm;

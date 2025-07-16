import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
}

const LoginForm = ({ handleLogin }: LoginFormProps ) => {
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
    <div className="login-form-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            className="input"
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit">Login</button>
      </form>
      <button className="btn-secondary" onClick={registerRedirect}>Register</button>
    </div>
  );
};

export default LoginForm;

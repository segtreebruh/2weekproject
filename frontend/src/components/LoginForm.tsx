import React, { useState } from "react";

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin(username, password);
  };
  
  return (
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
  );
};

export default LoginForm;

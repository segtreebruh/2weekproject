import type { RegisterRequest } from "@shared/types";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as registerService from '../services/registerService';
import { useNotification } from "../hooks/useNotification";
import { isAxiosError } from 'axios';

const RegisterForm = () => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { showNotification } = useNotification();
  const navigate = useNavigate();


  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const registerData: RegisterRequest = {
        username, 
        password,
        name, 
        email
      }

      await registerService.register(registerData);
      navigate("/login");
      showNotification("Register success", "success");
    } catch (err) {
      console.error(err);
      if (isAxiosError(err)) {
        showNotification(`${err.response?.data.error}`, "error");
      }
    }
  }
  
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            className="input"
            type="text"
            value={name}
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label>Email</label>
          <input
            className="input"
            type="text"
            value={email}
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="btn-primary" type="submit">Register</button>
      </form>
      <button className="btn-secondary" onClick={() => navigate("/login")}>Cancel</button>
    </div>
  )
}

export default RegisterForm;
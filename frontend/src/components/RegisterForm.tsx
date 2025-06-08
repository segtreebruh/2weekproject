import type { RegisterRequest } from "@shared/types";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as registerService from '../services/registerService';

const RegisterForm = () => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const registerData: RegisterRequest = {
        username, 
        password,
        name, 
        email
      }

      await registerService.register(registerData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name
          <input
            type="text"
            value={name}
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          Email
          <input
            type="text"
            value={email}
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
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
        <button>Register</button>
      </form>
      <button onClick={() => navigate("/")}>Cancel</button>
    </>
  )
}

export default RegisterForm;
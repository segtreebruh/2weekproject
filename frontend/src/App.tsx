import { useState, useEffect } from "react";
import axios from "axios";
import type { LoginRequest, Contact } from '../../types';
import LoginForm from "./components/LoginForm";


function App() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (user !== null) {
      console.log(user);
      const contactUrl = "/api/contacts";
      const token = user.token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(contactUrl, config).then((response) => {
        setContacts(response.data.filter(
          contact => contact.belongsTo.username === user.username
        ))
      }) 
    }
  }, [user]); // Add dependency array to prevent infinite re-renders

  const handleLogin = async (username: string, password: string) => {
    const credentials: LoginRequest = {
      username,
      password,
    };

    await handleLoginBackend(credentials);
  };

  const handleLoginBackend = async (credentials: LoginRequest) => {
    const baseUrl = "/api/login";

    try {
      const response = await axios.post(baseUrl, credentials);
      const user = response.data;

      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <h1>login</h1>
      <LoginForm handleLogin={handleLogin} />
      {user !== null && (
        <div>
          <h2>Your Contacts</h2>
          {contacts.map((contact) => (
            <div>
              {contact!.name} {contact!.number} 
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;

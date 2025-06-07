import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (user !== null) {
      console.log(user);
      const contactUrl = "/api/contacts";
      const token = user.token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(contactUrl, config).then((response) => setContacts(response.data));
    }
  }, [user]); // Add dependency array to prevent infinite re-renders

  interface Credentials {
    username: string;
    password: string;
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials: Credentials = {
      username,
      password,
    };

    await handleLoginBackend(credentials);
  };

  const handleLoginBackend = async (credentials: Credentials) => {
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
      <form onSubmit={handleLogin}>
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

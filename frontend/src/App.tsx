import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, contacts, handleLogin } = useAuth();

  return (
    <>
      <h1>login</h1>
      <LoginForm handleLogin={handleLogin} />
      {user !== null && (
        <ContactDisplay contacts={contacts} username={user.username} />
      )}
    </>
  );
}

export default App;

import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import { useLogin } from "./hooks/useLogin";

function App() {
  const { user, contacts, handleLogin } = useLogin();

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

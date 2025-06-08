import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import RegisterForm from "./components/RegisterForm";
import { useLogin } from "./hooks/useLogin";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const { user, contacts, handleLogin } = useLogin();

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Login</h1>
            <LoginForm handleLogin={handleLogin} />
            {user !== null && (
              <ContactDisplay contacts={contacts} username={user.username} />
            )}
          </>
        } />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

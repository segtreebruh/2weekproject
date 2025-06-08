import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import RegisterForm from "./components/RegisterForm";
import { useLogin } from "./hooks/useLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { localStorageJwt, contacts, handleLogin, handleLogout } = useLogin();

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Login</h1>
            <LoginForm 
              handleLogin={handleLogin} 
              handleLogout={handleLogout}
              localStorageJwt={localStorageJwt}
            />
            {localStorageJwt !== null && (
              <ContactDisplay contacts={contacts} username={localStorageJwt.username} />
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

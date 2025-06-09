import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import RegisterForm from "./components/RegisterForm";
import { useLogin } from "./hooks/useLogin";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  // localStorageJwt: if not null, basically means logged in
  const { localStorageJwt, contacts, handleLogin, handleLogout } = useLogin();

  return (
    <Router>
      <Routes>
        {/* login route: go to /home if logged in*/}
        <Route
          path="/login"
          element={
            localStorageJwt
              ? <Navigate to="/home" replace />
              : <>
                  <h1>Login</h1>
                  <LoginForm
                    handleLogin={handleLogin}
                  />
                </>
          }
        />

        {/* home route: stay if logged in, else redirect to /login */}
        <Route
          path="/home"
          element={
            localStorageJwt
              ? <ContactDisplay contacts={contacts} username={localStorageJwt.username} handleLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        {/* register: always open, only accessible via /login */}
        <Route path="/register" element={<RegisterForm />} />

        {/* default route "/": redirect */}
        <Route 
          path="/"
          element={
            localStorageJwt 
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

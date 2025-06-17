import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import RegisterForm from "./components/RegisterForm";
import { NotFoundPage } from "./components/NotFoundPage";
import { useLogin } from "./hooks/useLogin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  // localStorageJwt: if not null, basically means logged in
  const {
    JwtAccessToken,
    contacts,
    handleLogin,
    handleLogout,
    handleAddContact,
  } = useLogin();

  return (
    <Router>
      <Routes>
        {/* login route: go to /home if logged in*/}
        <Route
          path="/login"
          element={
            JwtAccessToken ? (
              <Navigate to="/home" replace />
            ) : (
              <>
                <h1>Login</h1>
                <LoginForm handleLogin={handleLogin} />
              </>
            )
          }
        />

        {/* home route: stay if logged in, else redirect to /login */}
        <Route
          path="/home"
          element={
            JwtAccessToken ? (
              <ContactDisplay
                contacts={contacts}
                username={JwtAccessToken.username}
                handleLogout={handleLogout}
                handleAddContact={handleAddContact}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* register: always open, only accessible via /login */}
        <Route path="/register" element={<RegisterForm />} />

        {/* default route "/": redirect */}
        <Route
          path="/"
          element={
            JwtAccessToken ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

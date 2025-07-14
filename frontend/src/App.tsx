import LoginForm from "./components/LoginForm";
import ContactDisplay from "./components/ContactDisplay";
import RegisterForm from "./components/RegisterForm";
import { NotFoundPage } from "./components/NotFoundPage";
import { useLogin } from "./hooks/useLogin";
import { useContacts } from "./hooks/useContacts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const {
    payload,
    contacts,
    handleLogin,
    handleLogout,
  } = useLogin();

  const { handleAddContact } = useContacts();

  return (
    <Router>
      <Routes>
        {/* login route: go to /home if logged in*/}
        <Route
          path="/login"
          element={
            payload ? (
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
            payload ? (
              <ContactDisplay
                contacts={contacts}
                username={payload.username}
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
            payload ? (
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

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          {/* Landing page - now the default route */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Redirect unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

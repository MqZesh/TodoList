import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage activatedPage="login" />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<RegisterPage activatedPage="register" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

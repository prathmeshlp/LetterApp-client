import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

  console.log(apiUrl);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute component={Dashboard} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
      {/* Redirect unknown routes */}
    </Routes>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth/user`, {
          credentials: "include", // Include cookies
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

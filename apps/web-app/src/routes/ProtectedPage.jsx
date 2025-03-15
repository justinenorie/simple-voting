import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
    
        const response = await axiosInstance.get("/api/token/verifyToken", {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        });
    
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        console.log(error);
      }
    };
    

    verifyToken();
  }, []);

  if (isAuthenticated === null) return null; // Wait until the check is complete

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

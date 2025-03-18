import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Step 1: Verify access token
        const response = await axiosInstance.get("/api/users/verifyToken", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Access token expired");
        }
      } catch (error) {
        console.log("Token expired, trying to refresh...", error);

        // Step 2: Try refreshing the token
        try {
          const refreshResponse = await axiosInstance.post(
            "/api/users/refreshToken"
          );
          localStorage.setItem("token", refreshResponse.data.accessToken);
          setIsAuthenticated(true);
        } catch (refreshError) {
          console.log("Refresh token expired, logging out...", refreshError);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) return null; // Wait until the check is complete

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

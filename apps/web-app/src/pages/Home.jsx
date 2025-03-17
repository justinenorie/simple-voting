import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/users/logout"); // Call logout API
      localStorage.removeItem("token"); // Remove access token
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold text-blue-900">
        Welcome to Our Website!
      </h1>
      <Link to="/">Click to view our Login page</Link>
      <button
        onClick={handleLogout}
        className="mt-4 rounded bg-red-500 p-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;

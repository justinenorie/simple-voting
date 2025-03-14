import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold text-blue-900">
        Welcome to Our Website!
      </h1>
      <Link to="login">Click to view our Login page</Link>
    </div>
  );
};

export default HomePage;

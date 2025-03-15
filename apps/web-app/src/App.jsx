import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedPage";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Prevent logged-in users from accessing Login/Register */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* To Prevent accessing the Page without Logging In */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

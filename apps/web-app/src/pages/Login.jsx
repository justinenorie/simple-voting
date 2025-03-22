import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@/components/ui/Typography";
import axiosInstance from "@/api/axiosInstance";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Post the data using REST APIs
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.post("/api/users/login", formData);
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/home"); // Redirect to dashboard (or any protected route)
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-bg flex min-h-screen flex-col items-center justify-center">
      <div className="fade-in border-accent bg-secondary grid w-auto gap-3 rounded-lg border p-8 shadow-lg">
        <header className="mb-2">
          <Typography variant="h2" className="text-txt-light mb-2">
            Login
          </Typography>
          <Typography variant="p" className="text-txt-light/70">
            Enter your credentials to access your account
          </Typography>
        </header>

        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="flex">
              <Typography variant="p" className="text-txt-light">
                Email
              </Typography>
            </label>

            <Typography variant="p" className="text-txt-light">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded bg-black/50 p-3 text-white focus:outline-none"
                required
              />
            </Typography>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password">
                <Typography variant="p" className="text-txt-light">
                  Password
                </Typography>
              </label>
              <a href="#">
                <Typography variant="small" className="text-txt-light">
                  Forgot password?
                </Typography>
              </a>
            </div>

            <Typography variant="p" className="text-txt-light">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded bg-black/50 p-3 text-white focus:outline-none"
                required
              />
            </Typography>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="text-txt-light w-full"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Typography
          variant="small"
          className="text-txt-light/50 mt-4 text-center"
        >
          {"Don't"} have an account?
          <Link to="/register" className="ml-1 text-blue-400">
            Register
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;

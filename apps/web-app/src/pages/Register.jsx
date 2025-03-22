import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import Typography from "@/components/ui/Typography";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/users/register", formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="gradient-bg flex min-h-screen flex-col items-center justify-center">
      <div className="fade-in bg-secondary border-accent w-auto gap-3 rounded-lg border-1 p-8 shadow-lg">
        <header className="mb-6">
          <Typography variant="h2" className="text-txt-light">
            Create your account
          </Typography>
          <Typography variant="p" className="text-txt-light/70">
            Join our platform to start voting!
          </Typography>
        </header>

        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-5 space-y-2">
            <div>
              <label htmlFor="first_name" className="flex">
                <Typography variant="p" className="text-txt-light">
                  First Name
                </Typography>
              </label>

              <Typography variant="p" className="text-txt-light">
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  value={formData.email} //Change this into first name
                  onChange={handleChange}
                  className="w-full rounded bg-black/50 p-3 text-white focus:outline-none"
                  required
                />
              </Typography>
            </div>

            <div>
              <label htmlFor="last_name" className="flex">
                <Typography variant="p" className="text-txt-light">
                  Last Name
                </Typography>
              </label>

              <Typography variant="p" className="text-txt-light">
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  value={formData.email} //Change this into Last Name
                  onChange={handleChange}
                  className="w-full rounded bg-black/50 p-3 text-white focus:outline-none"
                  required
                />
              </Typography>
            </div>
          </div>

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
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded bg-black/50 p-3 text-white focus:outline-none"
                required
              />
            </Typography>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="flex">
              <Typography variant="p" className="text-txt-light">
                Password
              </Typography>
            </label>

            <Typography variant="p" className="text-txt-light">
              <input
                id="password"
                type="text"
                name="password"
                placeholder="name@example.com"
                value={formData.email} // Change this to password
                onChange={handleChange}
                className="w-full rounded bg-black/50 p-3 text-white focus:outline-none"
                required
              />
            </Typography>
          </div>

          <Button type="submit" className="text-txt-light w-full">
            {" "}
            <Typography variant="p">Create an Account</Typography>{" "}
          </Button>
        </form>
        <Typography
          variant="small"
          className="text-txt-light/50 mt-4 text-center"
        >
          Already have an account?{" "}
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;

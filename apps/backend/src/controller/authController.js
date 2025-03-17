import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtHandler.js";
import { findUserByEmail, createUser } from "../services/userService.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

// Registration Method
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await createUser(username, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Method
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email address" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generates Token
    const token = generateToken({ userId: user.id }, "1h");
    const refreshToken = generateToken({ userId: user.id }, "7d");

    // Stored in HTTP Only Cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout Method
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.json({ message: "Logged out successfully" });
};

// Verifier 
// export const tokenVerify = (req, res) => {
//   const decoded = verifyToken(token);



// Refresher
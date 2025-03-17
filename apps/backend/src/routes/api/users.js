import express from "express";
import dotenv from "dotenv";
import { verifyToken } from "../../utils/jwtHandler.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../../controller/authController.js";
import { verifyAccessToken } from "../../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Verify Token API
router.get("/verifyToken", verifyAccessToken);

// Token Refresher if it's logged in for 7 days
router.post("/refreshToken", (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(refreshToken);
    const newAccessToken = generateToken(decoded.userId);
    res
      .cookie("refreshToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

export default router;

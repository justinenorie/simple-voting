import express from "express";
import userRoutes from "./users.js";
import refreshToken from "./refreshToken.js";
import auth from "./auth.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/refresh", refreshToken);
router.use("/verify", auth);

export default router;

import express from "express";
import userRoutes from "./api/users.js";
import authToken from "./api/authToken.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/token", authToken);

export default router;

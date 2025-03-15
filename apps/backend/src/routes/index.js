import express from "express";
import userRoutes from "./users.js";
import authToken from "./authToken.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/token", authToken);

export default router;

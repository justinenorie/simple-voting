import express from "express";
import userRoutes from "./api/users.js";

const router = express.Router();

router.use("/users", userRoutes);

export default router;

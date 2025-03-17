import { verifyToken } from "../utils/jwtHandler.js";

export const verifyAccessToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  } else {
    res.json({ valid: true, user: decoded });
  }


  req.user = decoded; // Store user data for further use
  next(); // Proceed to the next middleware or route
};

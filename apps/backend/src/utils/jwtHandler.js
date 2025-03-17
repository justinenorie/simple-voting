import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generates a JWT token
 * @param {Object} payload - Data to encode in token
 * @param {String} expiresIn - Expiration time (e.g., "1h", "7d")
 * @returns {String} - Generated token
 */
export const generateToken = (payload, expiresIn) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

/**
 * Verifies a JWT token
 * @param {String} token - The token to verify
 * @returns {Object|Boolean} - Decoded token if valid, false if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

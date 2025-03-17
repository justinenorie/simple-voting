// Handles queries for user
// such as Add, Delete, 
import prisma from "../config/database.js";
import bcrypt from "bcryptjs";

// Find user by email
export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

// Create a new user
export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
};

// Get all users
export const getAllUsers = async () => {
  return prisma.user.findMany();
};

// Update user
export const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// Delete user
export const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

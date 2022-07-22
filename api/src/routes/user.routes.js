// Required modules
import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./../controllers/user.controller.js";

const router = Router();

// Get all users
router.get("/", getUsers);

// Get user by id
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

export default router;

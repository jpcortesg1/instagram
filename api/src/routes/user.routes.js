// Required modules
import { Router } from "express";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  validateCurrentUser,
  validateIsCurrentUserOrAdmin,
} from "../middlewares/user.middleware.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./../controllers/user.controller.js";

const router = Router();

// Get all users
router.get("/", verifyAdmin, getUsers);

// Get user by id
router.get("/:id", validateIsCurrentUserOrAdmin, getUserById);

// Update user
router.put("/:id", validateIsCurrentUserOrAdmin, updateUser);

// Delete user
router.delete("/:id", validateIsCurrentUserOrAdmin, deleteUser);

export default router;

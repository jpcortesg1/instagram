// Required modules
import { Router } from "express";
import {
  validateCreateUser,
  validateLogin,
} from "../middlewares/user.middleware.js";
import { createUser, login } from "../controllers/auth.controller.js";

const router = Router();

// Login
router.post("/login", validateLogin, login);

// Register route
router.post("/register", validateCreateUser, createUser);

export default router;

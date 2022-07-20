// Required modules
import { Router } from "express";
import {
  validateCreateUser,
  validateLogin,
} from "../middlewares/user.middleware.js";
import { createUser, login } from "./../controllers/user.controller.js";

const router = Router();

// Login
router.post("/auth/login", validateLogin, login);

// Register route
router.post("/auth/register", validateCreateUser, createUser);

export default router;

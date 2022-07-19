import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./../config.js";
import User from "./../models/User.model.js";
import bcrypt from "bcrypt";

const router = Router();

// Login
router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) return res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user.id, typeUser: user.isAdmin },
      SECRET_KEY
    );

    return res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Register route
router.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Response with user
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;

import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import { hashPassword } from "./../helpers/user.helpers.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate new password
    const hashPassword = await hashPassword(password);

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
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) return res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET_KEY);

    return res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

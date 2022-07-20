import { check } from "express-validator";
import { validateResult } from "./../helpers/validateHelper.js";

const checkUsername = check("username")
  .exists()
  .notEmpty()
  .isLength({ min: 3, max: 20 })
  .withMessage("The username must have 5 characters minimum up to 20");

const checkPassword = check("password")
  .exists()
  .notEmpty()
  .isLength({ min: 6 })
  .withMessage("The password must have 6 characters minimum");

const checkEmail = check("email")
  .exists()
  .notEmpty()
  .isEmail()
  .normalizeEmail();

export const validateCreateUser = [
  checkUsername,
  checkPassword,
  checkEmail,
  (req, res, next) => {
    const { username, password, email } = req.body;
    req.params = { username, password, email };
    validateResult(req, res, next);
  },
];

export const validateLogin = [
  checkUsername,
  checkPassword,
  (req, res, next) => {
    const { username, password } = req.body;
    req.params = { username, password };
    validateResult(req, res, next);
  },
];

import { check } from "express-validator";
import { createError } from "../helpers/errors.helper.js";
import { validateResult, validateToken } from "./../helpers/validateHelper.js";
import { isAdmin } from "./admin.middleware.js";

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

export const isCurrentUser = (req) => {
  const { id: userIdParams } = req.params;
  const { id: userIdToken } = req.decodeToken;
  return userIdParams === userIdToken;
};

export const validateIsCurrentUserOrAdmin = (req, res, next) => {
  try {
    const isValidToken = validateToken(req);
    if (isValidToken) {
      if (isCurrentUser(req) || isAdmin(req)) return next();
    }
    throw Error();
  } catch (error) {
    const objectError = createError(
      req.headers.authorization,
      error.message || "you don't have the credentials",
      "token",
      "headers"
    );
    return res.status(403).json({
      errors: [objectError],
    });
  }
};

export const validateCurrentUser = (req, res, next) => {
  try {
    const isValidToken = validateToken(req);
    if (isValidToken) {
      if (isCurrentUser(req)) return next();
    }
    throw Error();
  } catch (error) {
    const objectError = createError(
      req.headers.authorization,
      error.message || "you don't have the credentials",
      "token",
      "headers"
    );
    return res.status(403).json({
      errors: [objectError],
    });
  }
};

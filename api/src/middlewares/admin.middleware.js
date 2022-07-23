import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import { createError } from "../helpers/errors.helper.js";
import { validateToken } from "../helpers/validateHelper.js";

export const isAdmin = (req) => {
  const { decodeToken } = req;
  const { isAdmin } = decodeToken;
  return isAdmin;
};

export const verifyAdmin = (req, res, next) => {
  try {
    const isValidateToken = validateToken(req);
    if (isValidateToken) {
      if (isAdmin(req)) return next();
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

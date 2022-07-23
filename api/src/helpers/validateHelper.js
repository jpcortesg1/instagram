import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { SECRET_KEY } from "../config.js";

export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403).json(error);
  }
};

export const validateToken = (req) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const tokenSplit = authorization.split(" ");
      if (tokenSplit[0] !== "Bearer") throw Error();
      const decodeToken = jwt.verify(tokenSplit[1], SECRET_KEY);
      req.decodeToken = decodeToken;
      return true;
    }
  } catch (error) {
    return false;
  }
};

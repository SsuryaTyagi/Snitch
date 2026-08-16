import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateVerificationToken = (email) => {
  return jwt.sign({ email }, config.JWT_TOKEN_SECRET, { expiresIn: "1d" });
};

export const verifyVerificationToken = (token) => {
  return jwt.verify(token, config.JWT_TOKEN_SECRET);
};

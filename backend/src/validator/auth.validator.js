import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const error = validationResult(error);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const validateRegisterUser = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("fullname must be at least 3 characters long"),
  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .isMobilePhone("any")
    .withMessage("Please provide a valid mobile phone number"),

  body("role")
    .optional()
    .trim()
    .isIn(["buyer", "seller"])
    .withMessage("Role must be either buyer or seller"),

  validateRequest,
];

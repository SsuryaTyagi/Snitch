import { Router } from "express";
import {
  validateRegisterUser,
  validateLogin,
} from "../validator/auth.validator.js";
import {
  RegisterController,
  VerifyEmailController,
  loginController,
} from "../controllers/auth.controller.js";

const router = Router();

// register route
router.post("/register", validateRegisterUser, RegisterController);
// verify email route
router.get("/verify-email", VerifyEmailController);
// login route
router.post("/login", validateLogin, loginController);

export default router;

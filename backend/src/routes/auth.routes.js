import { Router } from "express";
import { validateRegisterUser ,validateLogin} from "../validator/auth.validator.js";
import {RegisterController, VerifyEmailController, loginController} from "../controllers/auth.controller.js"

const router = Router();

router.post("/register", validateRegisterUser, RegisterController);
router.get("/verify-email",    VerifyEmailController);
router.post("login", validateLogin, loginController);


export default router
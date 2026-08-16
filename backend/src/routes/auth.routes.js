import { Router } from "express";
import { validateRegisterUser } from "../validator/auth.validator.js";
import {RegisterController, VerifyEmailController} from "../controllers/auth.controller.js"

const router = Router();

router.post("/register", validateRegisterUser, RegisterController);
router.get("/verify-email",    VerifyEmailController);


export default router
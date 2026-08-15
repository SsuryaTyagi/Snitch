import { Router } from "express";
import { validateRegisterUser } from "../validator/auth.validator.js";
import {RegisterController} from "../controllers/auth.controller.js"

const router = Router();

router.post("/register", validateRegisterUser, RegisterController);


export default router
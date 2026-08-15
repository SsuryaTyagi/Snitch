import { Router } from "express";
import { validateRegisterUser } from "../validator/auth.validator";
import {RegisterController} from "../controllers/auth.controller"

const router = Router();

router.post("/register", validateRegisterUser, RegisterController);


export default router
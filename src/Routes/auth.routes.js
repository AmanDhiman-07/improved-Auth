import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'

const authRouter = Router()

// post route "/api/auth/register"

authRouter.post("/register", authController.register)

// get route "/api/auth/get-me"

authRouter.get("/get-me",authController.getMe)


export default authRouter
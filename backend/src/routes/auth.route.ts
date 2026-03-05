import { Router } from "express";
import authController from "@/controllers/auth.controller";
import bodyValidator from "@/middlewares/bodyValidator";
import loginSchema from "@/schemas/login.schema";

const authRouter = Router();

authRouter.post("/login", bodyValidator(loginSchema), authController.login);

export default authRouter;

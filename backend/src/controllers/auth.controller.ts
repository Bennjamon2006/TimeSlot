import type { Request, Response, NextFunction } from "express";
import authService from "@/services/auth.service";
import { LoginInput } from "@/schemas/login.schema";
import wrapController from "@/helpers/wrapController";

const login = async (req: Request, res: Response) => {
  const data: LoginInput = req.body;

  const result = await authService.login(data);

  res.json(result);
};

const authController = wrapController({
  login,
});

export default authController;

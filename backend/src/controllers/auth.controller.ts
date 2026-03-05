import type { Request, Response, NextFunction } from "express";
import authService from "@/services/auth.service";
import { LoginInput } from "@/schemas/login.schema";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: LoginInput = req.body;

    const result = await authService.login(data);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const authController = {
  login,
};

export default authController;

import type { Request, Response } from "express";
import authService from "@/services/auth.service";

const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.json(result);
};

const authController = {
  login,
};

export default authController;

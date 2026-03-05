import type { Request } from "express";
import authService from "@/services/auth.service";
import { LoginInput } from "@/schemas/login.schema";
import wrapController from "@/helpers/wrapController";
import Response from "@/helpers/Response";

const login = async (req: Request) => {
  const data: LoginInput = req.body;

  const result = await authService.login(data);

  return new Response(result);
};

const authController = wrapController({
  login,
});

export default authController;

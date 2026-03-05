import authService from "@/services/auth.service";
import loginSchema from "@/schemas/login.schema";
import wrapController from "@/helpers/wrapController";
import Response from "@/helpers/Response";
import { Request } from "@/types/Request";

const login = async (req: Request<typeof loginSchema>) => {
  const data = req.body;

  const result = await authService.login(data);

  return new Response(result);
};

const authController = wrapController({
  login,
});

export default authController;

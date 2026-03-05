import { sign } from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { prisma } from "@/database";
import { LoginInput } from "@/schemas/login.schema";
import { env } from "@/config/env";
import RequestError from "@/helpers/RequestError";

const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new RequestError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const passwordMatch = compareSync(data.password, user.password);

  if (!passwordMatch) {
    throw new RequestError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const token = sign({ userId: user.id }, env.auth.jwtSecret, {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    token,
  };
};

const authService = {
  login,
};

export default authService;

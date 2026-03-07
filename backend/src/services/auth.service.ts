import { sign, verify } from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { prisma } from "@/database";
import { LoginInput } from "@/schemas/login.schema";
import { env } from "@/config/env";
import RequestError from "@/helpers/RequestError";

const signUser = (userId: string) => {
  return sign({ userId }, env.auth.jwtSecret, {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  });
};

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

  const token = signUser(user.id);

  return {
    token,
  };
};

const verifyToken = async (token: string) => {
  try {
    const decoded = verify(token, env.auth.jwtSecret) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new RequestError("Invalid session", 401, "INVALID_SESSION");
    }

    return user;
  } catch (error) {
    throw new RequestError("Invalid session", 401, "INVALID_SESSION");
  }
};

const authService = {
  login,
  verifyToken,
  signUser,
};

export default authService;

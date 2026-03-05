import type { Request, Response, NextFunction } from "express";
import authService from "@/services/auth.service";

export default async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header missing",
        code: "AUTH_HEADER_MISSING",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token missing",
        code: "TOKEN_MISSING",
      });
    }

    const user = await authService.verifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

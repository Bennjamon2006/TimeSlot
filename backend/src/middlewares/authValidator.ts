import type { Request, Response, NextFunction } from "express";
import authService from "@/services/auth.service";
import RequestError from "@/helpers/RequestError";

export default async function authValidator(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new RequestError(
        "Authorization header missing",
        401,
        "AUTH_HEADER_MISSING",
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new RequestError("Token missing", 401, "TOKEN_MISSING");
    }

    const user = await authService.verifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

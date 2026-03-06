import RequestError from "@/helpers/RequestError";
import type { Request, Response, NextFunction } from "express";

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(new RequestError("Not found", 404, "NOT_FOUND"));
}

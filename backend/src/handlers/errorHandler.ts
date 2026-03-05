import RequestError from "@/helpers/RequestError";
import type { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof RequestError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
      details: error.details,
    });
  } else {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
}

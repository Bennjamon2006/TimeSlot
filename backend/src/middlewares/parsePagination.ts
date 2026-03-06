import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { paginationSchema } from "@/schemas/pagination.schema";
import RequestError from "@/helpers/RequestError";

export default function parsePagination(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = paginationSchema.safeParse(req.query);

    if (!result.success) {
      throw new RequestError(
        "Invalid pagination parameters",
        400,
        "INVALID_PAGINATION",
        z.flattenError(result.error).fieldErrors,
      );
    }

    req.pagination = result.data;
    delete req.query.page;
    delete req.query.pageSize;

    next();
  } catch (error) {
    next(error);
  }
}

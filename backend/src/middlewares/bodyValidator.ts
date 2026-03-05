import { z } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";
import RequestError from "@/helpers/RequestError";

export default function bodyValidator(schema: z.ZodTypeAny): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.safeParse(req.body);

      if (!validatedData.success) {
        throw new RequestError(
          "Invalid request data",
          400,
          "INVALID_REQUEST_DATA",
          z.flattenError(validatedData.error).fieldErrors,
        );
      }

      req.body = validatedData.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}

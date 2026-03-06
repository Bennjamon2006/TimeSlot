import { z } from "zod";
import { Response, NextFunction, RequestHandler } from "express";
import RequestError from "@/helpers/RequestError";
import { Request } from "@/types/Request";

export default function filterParser(schema: z.ZodTypeAny): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.safeParse(req.query);

      if (!validatedData.success) {
        throw new RequestError(
          "Invalid request data",
          400,
          "INVALID_REQUEST_DATA",
          z.flattenError(validatedData.error).fieldErrors,
        );
      }

      req.filters = validatedData.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}

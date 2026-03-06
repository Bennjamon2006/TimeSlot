import { z } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";
import RequestError from "@/helpers/RequestError";

export default function paramsValidator(schema: z.ZodTypeAny): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.safeParse(req.params);

      if (!validatedData.success) {
        console.log(validatedData.error.flatten());

        throw new RequestError(
          "Invalid request parameters",
          400,
          "INVALID_REQUEST_PARAMETERS",
          z.flattenError(validatedData.error).fieldErrors,
        );
      }

      req.params = validatedData.data as any;
      next();
    } catch (error) {
      next(error);
    }
  };
}

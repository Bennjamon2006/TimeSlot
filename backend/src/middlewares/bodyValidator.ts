import { z } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export default function bodyValidator(schema: z.ZodTypeAny): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        error: "Invalid request data",
        code: "INVALID_REQUEST_DATA",
        details: z.flattenError(validatedData.error).fieldErrors,
      });
    }

    req.body = validatedData.data;
    next();
  };
}

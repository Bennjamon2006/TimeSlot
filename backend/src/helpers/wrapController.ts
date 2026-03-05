import type { Request, Response, NextFunction, RequestHandler } from "express";

type Controller = {
  [key: string]: RequestHandler;
};

export default function wrapController<T extends Controller>(controller: T): T {
  const wrappedController: Partial<T> = {};

  for (const key in controller) {
    const handler = controller[key];

    wrappedController[key] = (async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    }) as any;
  }

  return wrappedController as T;
}

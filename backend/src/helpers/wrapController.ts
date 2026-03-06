import type { Request, Response, NextFunction, RequestHandler } from "express";
import CustomResponse from "./Response";
import { Request as CustomRequest } from "@/types/Request";

type Controller = {
  [key: string]: (
    req: CustomRequest<any, any, any, any>,
  ) => Promise<CustomResponse> | CustomResponse;
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
        const result = await handler(req);

        result.send(res);
      } catch (error) {
        next(error);
      }
    }) as any;
  }

  return wrappedController as T;
}

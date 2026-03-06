import type { Request as ExpressRequest } from "express";
import { z } from "zod";
import { User } from "@prisma/client";

type Request<
  B extends z.ZodTypeAny = z.ZodTypeAny,
  P extends z.ZodTypeAny = z.ZodTypeAny,
  Q extends z.ZodTypeAny = z.ZodTypeAny,
  F extends z.ZodTypeAny = z.ZodTypeAny,
> = ExpressRequest<z.infer<P>, any, z.infer<B>, z.infer<Q>> & {
  filters?: z.infer<F>;
};

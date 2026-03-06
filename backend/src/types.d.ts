import { User } from "@prisma/client";
import { PaginationParams } from "./schemas/pagination.schema";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      pagination?: PaginationParams;
    }
  }
}

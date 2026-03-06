import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export default function isForeignError(error: unknown): boolean {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === "P2003"
  );
}

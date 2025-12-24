import { Prisma } from "@/services/prisma/client";

export function isPrismaKnownRequestError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "string"
  );
}

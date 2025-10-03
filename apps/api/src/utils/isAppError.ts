import { AppError}  from "@/interfaces/IUser";



export function isAppError(err: unknown): err is AppError {
  return (
    typeof err === "object" &&
    err != null &&
    "code" in err &&
    typeof (err as any).code === "string" &&
    "message" in err &&
    typeof (err as any).message === "string"
  );
}

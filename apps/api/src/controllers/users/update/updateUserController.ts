import { Request, Response } from "express";
import { UpdateUserUseCase } from "@/usecases/users/updateUserUseCase";
import type { UserUpdateData } from "@/interfaces/IUsersRepo";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import z from "zod";

const updateUserSchema = z
  .object({
    userName: z.string().min(3).optional(),
    email: z.email().optional(),
    cellphoneNumber: z.string().min(10).optional(),
    password: z.string().min(6).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

class UpdateUserController {
  constructor(private useCase: UpdateUserUseCase) {}

  async run(request: Request, response: Response) {
    const { userId } = request.params;
    if (!userId) {
      return response.status(400).send({ message: "No user id sent" });
    }

    try {
      const payload = updateUserSchema.parse(
        request.body
      ) as unknown as UserUpdateData;
      return response.send(await this.useCase.handle(userId, payload));
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return response.status(409).send({
          message: "User with provided unique fields already exists.",
        });
      }
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return response.status(404).send({
          message: "User not found.",
        });
      }
      if (error instanceof z.ZodError) {
        return response.status(400).send({
          message: "Validation error",
          errors: error.message,
        });
      }

      return response.status(500).send({
        message: "An unexpected error occurred.",
      });
    }
  }
}

export { UpdateUserController };

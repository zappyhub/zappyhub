import { Request, Response } from "express";
import { CreateUserUseCase } from "@/usecases/users/createUserUseCase";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { z } from "zod";

const createUserSchema = z.object({
  userName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email format").optional(),
  cellphoneNumber: z.string().min(10).optional(),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  async run(request: Request, response: Response) {
    try {
      const payload = createUserSchema.parse(request.body);
      const user = await this.useCase.handle(payload);
      return response.status(201).send(user);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError && //<- Não ideal o controller não deveria conhecer o prisma
        error.code === "P2002"
      ) {
        return response.status(409).send({
          message: "User with provided unique fields already exists.",
        });
      }
      if (error instanceof z.ZodError) {
        return response.status(400).send({
          message: "Validation error",
          errors: error.message,
        });
      }
      return response.status(500).send();
    }
  }
}

export { CreateUserController };

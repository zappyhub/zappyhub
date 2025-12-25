import { SoftDeleteUserUseCase } from "@/usecases/users/softDeleteUserUseCase";
import { Request, Response } from "express";

class SoftDeleteUserController {
  constructor(private useCase: SoftDeleteUserUseCase) {}

  async run(request: Request, response: Response) {
    const userId = request.params.userId;

    try {
      return response.send(await this.useCase.handle(userId));
    } catch (error) {
      throw error;
    }
  }
}

export { SoftDeleteUserController };

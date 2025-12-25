import { Request, Response } from "express";
import { HardDeleteUserUseCase } from "@/usecases/users/hardDeleteUserUseCase";

class HardDeleteUserController {
  constructor(private useCase: HardDeleteUserUseCase) {}

  async run(request: Request, response: Response) {
    const userId = request.params.userId;

    try {
      return response.send(await this.useCase.handle(userId));
    } catch (error) {
      throw error;
    }
  }
}

export { HardDeleteUserController };

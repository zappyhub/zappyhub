import { Request, Response } from "express";
import { UpdateUserUseCase } from "@/usecases/users/updateUserUseCase";
import type { UserUpdateData } from "@/interfaces/IUsersRepo";

class UpdateUserController {
  constructor(private useCase: UpdateUserUseCase) {}

  async run(request: Request, response: Response) {
    const { userId } = request.params;
    if (!userId) {
      return response.status(400).send({ message: "No user id sent" });
    }
    const payload: UserUpdateData = request.body;

    try {
      return await response.send(this.useCase.handle(userId, payload));
    } catch (error) {
      throw error;
    }
  }
}

export { UpdateUserController };

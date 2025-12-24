import { Request, Response } from "express";
import { CreateUserUseCase } from "@/usecases/users/createUserUseCase";

class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  async run(request: Request, response: Response) {
    const payload = request.body;

    try {
      const user = await this.useCase.handle(payload);
      return response.status(201).send(user);
    } catch (error) {
      //error handling
      return response.status(500).send();
    }
  }
}

export { CreateUserController };

import { Request, Response } from "express";
import { GetUserByEmailUseCase } from "@/usecases/users/getUserByEmailUseCase";
import logger from "@/services/logger/logger";

class GetUserByEmailController {
  constructor(private useCase: GetUserByEmailUseCase) {}

  async run(request: Request, response: Response) {
    const { email } = request.query;

    if (!email) {
      return response.status(400).send({ message: "Email is missing" });
    }

    try {
      return response.send(await this.useCase.handle(email.toString()));
    } catch (error) {
      throw error;
    }
  }
}

export { GetUserByEmailController };

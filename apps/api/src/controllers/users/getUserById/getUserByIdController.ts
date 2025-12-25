import { Request, Response } from "express";
import { GetUserByIdUseCase } from "@/usecases/users/getUserByIdUseCase";
import logger from "@/services/logger/logger";

class GetUserByIdController {
  constructor(private useCase: GetUserByIdUseCase) {}

  async run(request: Request, response: Response) {
    const { id } = request.query;

    if (!id) {
      return response.status(400).send({ message: "Id is missing" });
    }

    try {
      return response.send(await this.useCase.handle(id.toString()));
    } catch (error) {
      throw error;
    }
  }
}

export { GetUserByIdController };

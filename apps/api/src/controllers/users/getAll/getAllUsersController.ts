import { Request, Response } from "express";
import { GetAllUsersUseCase } from "@/usecases/users/getAllUsersUseCase";
import logger from "@/services/logger/logger";

class GetAllUsersController {
  constructor(private useCase: GetAllUsersUseCase) {}

  async run(_request: Request, response: Response) {
    try {
      return response.send(await this.useCase.handle());
    } catch (error) {
      logger.error(
        `[USER CONTROLLER -  getAllUsersController]: Something went wrong! An unhandled error happend!`
      );
      logger.error(`[USER CONTROLLER -  getAllUsersController]: ${error}`);
      return response.status(500).send();
    }
  }
}

export { GetAllUsersController };

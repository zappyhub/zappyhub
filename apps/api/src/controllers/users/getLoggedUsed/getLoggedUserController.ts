import { Request, Response } from "express";
import { GetUserByIdUseCase } from "@/usecases/users/getUserByIdUseCase";
import logger from "@/services/logger/logger";

class GetLoggedUserController {
  constructor(private useCase: GetUserByIdUseCase) {}

  async run(_request: Request, response: Response) {
    const userID = response.locals.user.sub;

    try {
      return response.send(await this.useCase.handle(userID));
    } catch (error) {
      logger.warn(
        `[USER CONTROLLER -  getLoggedUserController]: User not found!`
      );
      logger.error(`[USER CONTROLLER -  getLoggedUserController]: ${error}`);
      return response.status(404).send();
    }
  }
}

export { GetLoggedUserController };

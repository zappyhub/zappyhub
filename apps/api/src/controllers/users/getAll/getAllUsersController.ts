import { Request, Response } from "express";
import { GetAllUsersUseCase } from "@/usecases/users/getAllUsersUseCase";
import logger from "@/services/logger/logger";

class GetAllUsersController {
  constructor(private useCase: GetAllUsersUseCase) {}

  async run(request: Request, response: Response) {
    const { cursor, limit } = request.query;

    try {
      const parsedLimit = typeof limit === "string" ? Number(limit) : 10;

      const safeLimit = !parsedLimit || parsedLimit <= 0 ? 10 : parsedLimit;

      const result = await this.useCase.handle({
        cursor: typeof cursor === "string" ? cursor : undefined,
        limit: safeLimit,
      });

      return response.status(200).json(result);
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

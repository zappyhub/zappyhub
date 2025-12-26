import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

type GetAllUsersParams = {
  cursor?: string;
  limit: number;
};

class GetAllUsersUseCase {
  constructor(private getAllUsersUseCaseRepo: IUsersRepo) {}

  async handle({ cursor, limit }: GetAllUsersParams) {
    logger.info(`[USER USE CASE -  getAllUsersUseCase]: Use case run!`);
    return this.getAllUsersUseCaseRepo.getAll({ cursor, limit });
  }
}

export { GetAllUsersUseCase };

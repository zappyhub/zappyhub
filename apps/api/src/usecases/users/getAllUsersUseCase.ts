import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class GetAllUsersUseCase {
  constructor(private getAllUsersUseCaseRepo: IUsersRepo) {}

  async handle() {
    logger.info(`[USER USE CASE -  getAllUsersUseCase]: Use case run!`);
    return this.getAllUsersUseCaseRepo.getAll();
  }
}

export { GetAllUsersUseCase };

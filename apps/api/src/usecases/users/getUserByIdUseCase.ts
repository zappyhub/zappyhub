import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class GetUserByIdUseCase {
  constructor(private getUserByIdUseCaseRepo: IUsersRepo) {}

  async handle(id: string) {
    logger.info(`[USER USE CASE -  getUserByIdUseCase]: Use case run!`);
    return await this.getUserByIdUseCaseRepo.getUserById(id);
  }
}

export { GetUserByIdUseCase };

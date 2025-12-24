import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class SoftDeleteUserUseCase {
  constructor(private softDeleteUserUseCaseRepo: IUsersRepo) {}

  async handle(id: string) {
    logger.info(`[USER USE CASE -  softDeleteUserUseCase]: Use case run!`);
    return await this.softDeleteUserUseCaseRepo.softDeleteUser(id);
  }
}

export { SoftDeleteUserUseCase };

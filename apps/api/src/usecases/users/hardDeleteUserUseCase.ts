import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class HardDeleteUserUseCase {
  constructor(private hardDeleteUserUseCaseRepo: IUsersRepo) {}

  async handle(id: string) {
    logger.info(`[USER USE CASE -  hardDeleteUserUseCase]: Use case run!`);
    return await this.hardDeleteUserUseCaseRepo.hardDeleteUser(id);
  }
}

export { HardDeleteUserUseCase };

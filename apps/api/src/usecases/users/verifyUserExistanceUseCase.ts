import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class VerifyUserExistanceUseCase {
  constructor(private verifyUserExistanceUseCaseRepo: IUsersRepo) {}

  async handle(id: string) {
    logger.info(`[USER USE CASE -  verifyUserExistanceUseCase]: Use case run!`);
    return this.verifyUserExistanceUseCaseRepo.exists(id);
  }
}

export { VerifyUserExistanceUseCase };

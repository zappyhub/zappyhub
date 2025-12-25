import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class GetUserByEmailUseCase {
  constructor(private getUserByEmailUseCaseRepo: IUsersRepo) {}

  async handle(email: string) {
    logger.info(`[USER USE CASE -  getUserByEmailUseCase]: Use case run!`);
    return await this.getUserByEmailUseCaseRepo.getUserByEmail(email);
  }
}

export { GetUserByEmailUseCase };

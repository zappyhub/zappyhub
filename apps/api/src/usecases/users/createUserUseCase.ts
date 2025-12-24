import { CreateUserPayload, IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class createUserUseCase {
  constructor(private createUserUseCaseRepo: IUsersRepo) {}

  async handle(payload: CreateUserPayload) {
    logger.info(`[USER CASE -  createUserUseCase]: Use case run!`);
    await this.createUserUseCaseRepo.create(payload);
  }
}

export { createUserUseCase };

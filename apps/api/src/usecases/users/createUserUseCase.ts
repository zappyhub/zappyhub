import { CreateUserPayload, IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class CreateUserUseCase {
  constructor(private createUserUseCaseRepo: IUsersRepo) {}

  async handle(payload: CreateUserPayload) {
    logger.info(`[USER USE CASE -  createUserUseCase]: Use case run!`);
    return await this.createUserUseCaseRepo.create(payload);
  }
}

export { CreateUserUseCase };

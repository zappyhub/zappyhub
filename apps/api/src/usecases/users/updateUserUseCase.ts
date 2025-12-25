import { IUsersRepo, UserUpdateData } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class UpdateUserUseCase {
  constructor(private updateUserUseCaseRepo: IUsersRepo) {}

  async handle(id: string, payload: UserUpdateData) {
    logger.info(`[USER USE CASE -  updateUserUseCase]: Use case run!`);
    return await this.updateUserUseCaseRepo.updateUser(id, payload);
  }
}

export { UpdateUserUseCase };

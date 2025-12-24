import { IUsersRepo } from "@/interfaces/IUsersRepo";
import logger from "@/services/logger/logger";

class GetUserByCellphoneNumberUseCase {
  constructor(private getUserByCellphoneNumberUseCaseRepo: IUsersRepo) {}

  async handle(cellphoneNumber: string) {
    logger.info(
      `[USER USE CASE -  getUserByCellphoneNumberUseCase]: Use case run!`
    );
    return await this.getUserByCellphoneNumberUseCaseRepo.getUserByCellphoneNumber(
      cellphoneNumber
    );
  }
}

export { GetUserByCellphoneNumberUseCase };

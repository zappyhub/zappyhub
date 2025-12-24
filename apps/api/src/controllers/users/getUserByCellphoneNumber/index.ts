import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { GetUserByCellphoneNumberUseCase } from "@/usecases/users/getUserByCellphoneNumberUseCase";
import { GetUserByCellphoneNumberController } from "./getUserByCellphoneNumberController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new GetUserByCellphoneNumberUseCase(postgresImpl);
const getUserByCellphoneNumberController =
  new GetUserByCellphoneNumberController(useCase);

export default getUserByCellphoneNumberController;

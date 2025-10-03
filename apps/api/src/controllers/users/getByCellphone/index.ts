import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";
import { GetUserByPhoneUseCase } from "@/usecases/users/getUserByPhoneUseCase";
import { GetUserByPhoneController } from "@/controllers/users/getByCellphone/getUserByCellphoneController";

const repo = new userPrismaPostgresImpl();
const usecase = new GetUserByPhoneUseCase(repo);
export const getByPhoneController = new GetUserByPhoneController(usecase);




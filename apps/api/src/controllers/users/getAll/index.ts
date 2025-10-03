import { GetAllUsersController } from "@/controllers/users/getAll/getAllUsersController";
import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";
import { GetAllUsersUseCase } from "@/usecases/users/getAllUsersUseCase";




const repo = new userPrismaPostgresImpl();
const usecase = new GetAllUsersUseCase(repo);
export const getAllController = new GetAllUsersController(usecase);




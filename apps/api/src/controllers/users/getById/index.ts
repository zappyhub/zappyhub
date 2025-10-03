import { GetUserByIdUseCase } from "@/usecases/users/getUserByIdUseCase";
import { GetUserByIdController } from "@/controllers/users/getById/getUserByIdController";
import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";



const repo = new userPrismaPostgresImpl();
const usecase = new GetUserByIdUseCase(repo);
export const getByIdController = new GetUserByIdController(usecase);




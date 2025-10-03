import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";
import { CreateUserUseCase } from "@/usecases/users/createUserUseCase";
import { CreateUserController } from "@/controllers/users/create/createUserController";




const repo = new userPrismaPostgresImpl();
const useCase = new CreateUserUseCase(repo);
export const createUserController = new CreateUserController(useCase);



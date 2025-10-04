
import { UpdateUserUseCase } from "@/usecases/users/updateUserUseCase";
import { UpdateUserController } from "@/controllers/users/update/updateUserController";
import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl"
//

const repo = new userPrismaPostgresImpl;
const usecase = new UpdateUserUseCase(repo);
export const updateUserController  = new UpdateUserController(usecase);



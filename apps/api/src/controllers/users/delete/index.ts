import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";
import { DeleteUserUseCase } from "@/usecases/users/deleteUserUseCase";
import { DeleteUserController } from "@/controllers/users/delete/deleteUserController";



const repo = new userPrismaPostgresImpl();
const usecase = new DeleteUserUseCase(repo);
export const deleteUserController = new DeleteUserController(usecase);




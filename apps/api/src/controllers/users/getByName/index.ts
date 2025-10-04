import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";
import { GetUserByNameController } from "@/controllers/users/getByName/getUserByNameController";
import { GetUserByNameUseCase } from "@/usecases/users/getUserByNameUseCase";

const repo = new userPrismaPostgresImpl();
const usecase = new GetUserByNameUseCase(repo);
export const getByNameController = new GetUserByNameController(usecase);




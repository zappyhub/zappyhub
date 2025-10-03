import { GetUserByEmailUseCase } from "@/usecases/users/getUserByEmailUseCase";
import { GetUserByEmailController } from "@/controllers/users/getByEmail/getUserByEmail";
import userPrismaPostgresImpl from "@/implementations/users/userPrismaPostgresImpl";

const repo = new userPrismaPostgresImpl();
const usecase = new GetUserByEmailUseCase(repo);
export const getByEmailController = new GetUserByEmailController(usecase);




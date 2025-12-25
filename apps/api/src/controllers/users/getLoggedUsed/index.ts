import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { GetUserByIdUseCase } from "@/usecases/users/getUserByIdUseCase";
import { GetLoggedUserController } from "./getLoggedUserController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new GetUserByIdUseCase(postgresImpl);
const getLoggedUserController = new GetLoggedUserController(useCase);

export default getLoggedUserController;

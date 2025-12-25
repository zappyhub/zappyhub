import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { GetAllUsersUseCase } from "@/usecases/users/getAllUsersUseCase";
import { GetAllUsersController } from "./getAllUsersController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new GetAllUsersUseCase(postgresImpl);
const getAllUsersController = new GetAllUsersController(useCase);

export default getAllUsersController;

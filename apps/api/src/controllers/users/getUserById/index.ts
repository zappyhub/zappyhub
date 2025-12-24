import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { GetUserByIdUseCase } from "@/usecases/users/getUserByIdUseCase";
import { GetUserByIdController } from "./getUserByIdController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new GetUserByIdUseCase(postgresImpl);
const getUserByIdController = new GetUserByIdController(useCase);

export default getUserByIdController;

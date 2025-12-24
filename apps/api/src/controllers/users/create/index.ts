import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "@/usecases/users/createUserUseCase";
import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new CreateUserUseCase(postgresImpl);
const createUserController = new CreateUserController(useCase);

export default createUserController;

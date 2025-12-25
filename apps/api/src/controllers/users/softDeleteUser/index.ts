import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { SoftDeleteUserUseCase } from "@/usecases/users/softDeleteUserUseCase";
import { SoftDeleteUserController } from "./softDeleteUserController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new SoftDeleteUserUseCase(postgresImpl);
const softDeleteUserController = new SoftDeleteUserController(useCase);

export default softDeleteUserController;

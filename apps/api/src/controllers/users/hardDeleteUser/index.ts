import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { HardDeleteUserUseCase } from "@/usecases/users/hardDeleteUserUseCase";
import { HardDeleteUserController } from "./hardDeleteUserController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new HardDeleteUserUseCase(postgresImpl);
const hardDeleteUserController = new HardDeleteUserController(useCase);

export default hardDeleteUserController;

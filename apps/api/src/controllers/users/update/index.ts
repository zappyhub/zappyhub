import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { UpdateUserUseCase } from "@/usecases/users/updateUserUseCase";
import { UpdateUserController } from "./updateUserController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new UpdateUserUseCase(postgresImpl);
const updateUserController = new UpdateUserController(useCase);

export default updateUserController;

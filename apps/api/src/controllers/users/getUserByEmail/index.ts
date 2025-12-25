import { PrismaPostgresUserImplementation } from "@/implementations/users/PrismaPostgresUserImplementation";
import { GetUserByEmailUseCase } from "@/usecases/users/getUserByEmailUseCase";
import { GetUserByEmailController } from "./getUserByEmailController";

const postgresImpl = new PrismaPostgresUserImplementation();
const useCase = new GetUserByEmailUseCase(postgresImpl);
const getUserByEmailController = new GetUserByEmailController(useCase);

export default getUserByEmailController;

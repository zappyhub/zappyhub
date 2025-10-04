import PrismaPostgresUserImpl from "@/implementations/users/userPrismaPostgresImpl";
import { JwtTokenProvider } from "@/routes/middlewares/auth/jwtTokenProvider";
import { LoginUseCase } from "@/usecases/login/LoginUseCase";
import { LoginController } from "@/controllers/auth/LoginController";
import { HashService } from "@/utils/hashService";

export const userRepo = new PrismaPostgresUserImpl();
export const hashService = new HashService();
export const tokenProvider = new JwtTokenProvider();
export const loginUseCase = new LoginUseCase(userRepo, hashService, tokenProvider)

export const loginController = new LoginController(loginUseCase)

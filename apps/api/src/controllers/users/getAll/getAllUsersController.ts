import type { Response, Request } from "express";
import { GetAllUsersUseCase } from "@/usecases/users/getAllUsersUseCase";
import { Result, toUserResponse, UserEntity, UserResponseDTO, ErrorResponseDTO, AuthUser } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { handleResult } from "@/utils/handleResult";


export class GetAllUsersController {
  constructor(private readonly usecase: GetAllUsersUseCase) { }
  async run(req: Request & { user?: AuthUser }, res: Response<UserResponseDTO[] | ErrorResponseDTO>): Promise<void> {

    const currentUser = req.user;

    logger.info({ currentUserId: currentUser?.id, role: currentUser?.role }, "[CONTROLLER - GetAllUsers]: Entrada");

    if (!currentUser) {
      res.status(401).json({ error: "Usuário não autenticado" })
      return;
    }
    try {
      const result: Result<UserEntity[]> = await this.usecase.handle(currentUser);

      handleResult(res, result, 200, (users) => users.map(toUserResponse));
    } catch (err: unknown) {
      logger.error({ err }, "[CONTROLLER - GetAllUsers]: Erro inesperado");
      res.status(500).json({ error: "Erro interno ao processar requisição" })
    }
  }
} 

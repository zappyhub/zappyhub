import type { DeleteUserUseCase } from "@/usecases/users/deleteUserUseCase";
import type { Request, Response } from "express";
import logger from "@/services/logger/logger";
import type { AuthUser, DeletedUserDTO, ErrorResponseDTO, Result } from "@/interfaces/IUser";
import { handleResult } from "@/utils/handleResult";
//



export class DeleteUserController {
  constructor(private readonly usecase: DeleteUserUseCase) { }

  async run(
    req: Request & { user?: AuthUser },
    res: Response<DeletedUserDTO | ErrorResponseDTO>,
  ): Promise<void> {

    const { id } = req.params as { id: string };
    const currentUser = req.user;

    logger.info({ userId: id, currentUserId: currentUser?.id }, "[USERS - DeleteUser]: Entrada ");

    if (!currentUser) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }
    try {

      const result: Result<DeletedUserDTO> = await this.usecase.handle(id, currentUser);

      handleResult(res, result, 200, (dto) => dto)
    } catch (err) {
      logger.error({ err }, "[CONTROLLER - DeleteUser]: Erro inesperado");
      res.status(500).json({ error: "Erro interno ao processa requisiçãoa" })
    }
  }
}

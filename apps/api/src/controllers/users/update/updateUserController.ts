import type { Response, Request } from "express";
import type { UserEntity, UserResponseDTO, Result, ErrorResponseDTO, AuthUser, UpdateUserDTO } from "@/interfaces/IUser";

import type { UpdateUserUseCase } from "@/usecases/users/updateUserUseCase";
import { toUserResponse } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { handleResult } from "@/utils/handleResult";


////







export class UpdateUserController {
  constructor(private readonly usecase: UpdateUserUseCase) { }

  async run(req: Request & { currentUser?: AuthUser }, res: Response<UserResponseDTO | ErrorResponseDTO>): Promise<void> {
    const { id } = req.params as { id: string };
    const body = req.body as UpdateUserDTO

    logger.info({ userId: id, body: req.body }, "[CONTROLLER - UpdateUser]: Entrada");

    try {
      if (!req.currentUser) {
        res.status(401).json({ error: "Não autenticado" })
        return
      }
      const result: Result<UserEntity> = await this.usecase.handle(id, body, req.currentUser);

      handleResult(res, result, 200, toUserResponse);
    } catch (err: unknown) {
      logger.error({ err }, "[CONTROLLER - UpdateUser]: Erro inesperado")
      res.status(500).json({ error: "Erro interno ao processar requisição" })
    }
  }
}
